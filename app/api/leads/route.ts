import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import crypto from "crypto";

function hashData(value: string | undefined): string | null {
  if (!value) return null;
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function hashPhone(phone: string | undefined): string | null {
  if (!phone) return null;
  // Clean phone number to digits only (e.g. +1 (310) 555-0199 -> 13105550199)
  const cleaned = phone.replace(/\D/g, "");
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      eventId,
      location,
      treatments = [],
      revenue,
      acquisition = [],
      hasTraffic,
      crewReady,
      firstName,
      lastName,
      clinicName,
      website,
      email,
      phone,
    } = body;

    // 1. Sanitize Website URL
    let sanitizedWebsite = (website || "").trim();
    if (sanitizedWebsite && !/^https?:\/\//i.test(sanitizedWebsite)) {
      sanitizedWebsite = `https://${sanitizedWebsite}`;
    }

    // 2. Format fields for Airtable notes
    const treatmentsStr = Array.isArray(treatments) ? treatments.join(", ") : treatments;
    const acquisitionStr = Array.isArray(acquisition) ? acquisition.join(", ") : acquisition;
    const fullName = `${firstName || ""} ${lastName || ""}`.trim();

    const isQualified = revenue !== "Under $20k/mo" && crewReady === "Yes, we are ready to schedule";

    const summary = `
MedSpa Partnership Application
-----------------------------
Clinic Name: ${clinicName || "N/A"}
Website: ${sanitizedWebsite || "N/A"}
Location: ${location || "N/A"}
Email: ${email || "N/A"}
Phone: ${phone || "N/A"}
Primary Treatments: ${treatmentsStr || "N/A"}
Monthly Revenue: ${revenue || "N/A"}
Patient Acquisition: ${acquisitionStr || "N/A"}
Has Website Traffic: ${hasTraffic || "N/A"}
Crew Ready (1-2 Hours): ${crewReady || "N/A"}
Qualification Status: ${isQualified ? "PRE-QUALIFIED / HIGH PRIORITY" : "STANDARD INQUIRY"}
    `.trim();

    // 3. Save a local backup in data/leads.json
    const leadData = {
      timestamp: new Date().toISOString(),
      fullName,
      email,
      phone,
      clinicName,
      website: sanitizedWebsite,
      location,
      treatments,
      revenue,
      acquisition,
      hasTraffic,
      crewReady,
      isQualified,
      summary,
    };

    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "leads.json");
      let existingLeads = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        existingLeads = JSON.parse(fileContent || "[]");
      }
      existingLeads.push(leadData);
      fs.writeFileSync(filePath, JSON.stringify(existingLeads, null, 2), "utf-8");
      console.log(`[Lead API] Lead saved locally to ${filePath}`);
    } catch (fsErr) {
      console.error("[Lead API] Failed to write backup lead to local file:", fsErr);
    }

    // 3.2 Send to Meta Conversions API (CAPI) if credentials are configured
    const metaPixelId = process.env.META_PIXEL_ID;
    const metaAccessToken = process.env.META_ACCESS_TOKEN;

    if (metaPixelId && metaAccessToken) {
      const userAgent = request.headers.get("user-agent") || "";
      const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0].trim() 
        || request.headers.get("x-real-ip") 
        || "127.0.0.1";
      const referer = request.headers.get("referer") || "https://kitestudios.net/medspa";

      const hashedEmail = hashData(email);
      const hashedPhone = hashPhone(phone);
      const hashedFirstName = hashData(firstName);
      const hashedLastName = hashData(lastName);

      const capiPayload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
            event_id: eventId || `lead_fallback_${Date.now()}`, // Fallback if client eventId is missing
            action_source: "website",
            event_source_url: referer,
            user_data: {
              em: hashedEmail ? [hashedEmail] : [],
              ph: hashedPhone ? [hashedPhone] : [],
              fn: hashedFirstName ? [hashedFirstName] : [],
              ln: hashedLastName ? [hashedLastName] : [],
              client_ip_address: ipAddress,
              client_user_agent: userAgent,
            },
            custom_data: {
              content_name: "Medspa Curation Trial Application",
              content_category: "Lead Acquisition",
              value: 0.00,
              currency: "USD",
            },
          },
        ],
      };

      console.log(`[Lead API] Submitting to Meta Conversions API for eventID: ${eventId}`);
      try {
        const capiResponse = await fetch(
          `https://graph.facebook.com/v20.0/${metaPixelId}/events?access_token=${metaAccessToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(capiPayload),
          }
        );

        const capiResult = await capiResponse.json();
        if (capiResponse.ok) {
          console.log("[Lead API] Conversions API event sent successfully:", capiResult);
        } else {
          console.error("[Lead API] Conversions API responded with error:", capiResult);
        }
      } catch (capiErr) {
        console.error("[Lead API] Failed sending to Meta Conversions API:", capiErr);
      }
    } else {
      console.warn("[Lead API] Meta Pixel credentials missing in .env.local. Skipping CAPI event submission.");
    }

    // 3.5 Send Email Notification if SMTP credentials are configured in .env.local
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO || "tomy@kitestudios.net";
    const emailFrom = process.env.EMAIL_FROM || "no-reply@kitestudios.net";

    if (smtpHost && smtpUser && smtpPass) {
      console.log(`[Lead API] Sending email notification to ${emailTo}`);
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || "587"),
          secure: smtpPort === "465",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"KiteStudios Curation Quiz" <${emailFrom}>`,
          to: emailTo,
          subject: `✨ New MedSpa Curation Lead: ${clinicName || fullName}`,
          text: summary,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EBE8E2; background-color: #FCFAF7; border-radius: 8px;">
              <h2 style="color: #C5A880; font-family: Georgia, serif; text-transform: uppercase; margin-bottom: 20px; font-weight: normal; border-bottom: 2px solid #E3DFD5; padding-bottom: 10px;">
                New MedSpa Curation Application
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold; width: 180px;">Clinic Name:</td>
                  <td style="padding: 8px 0;">${clinicName || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold;">Applicant Name:</td>
                  <td style="padding: 8px 0;">${fullName || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold;">Website URL:</td>
                  <td style="padding: 8px 0;"><a href="${sanitizedWebsite}" style="color: #C5A880; text-decoration: none;">${sanitizedWebsite || "N/A"}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold;">Location:</td>
                  <td style="padding: 8px 0;">${location || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold;">Work Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}">${email || "N/A"}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold;">Direct Mobile Phone:</td>
                  <td style="padding: 8px 0;">${phone || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold;">Revenue Bracket:</td>
                  <td style="padding: 8px 0;">${revenue || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold;">Patient Acquisition:</td>
                  <td style="padding: 8px 0;">${acquisitionStr || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold;">Website Traffic:</td>
                  <td style="padding: 8px 0;">${hasTraffic || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #E3DFD5;">
                  <td style="padding: 8px 0; font-weight: bold;">On-Site Filming Ready:</td>
                  <td style="padding: 8px 0;">${crewReady || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Curation Screening:</td>
                  <td style="padding: 8px 0; font-weight: ${isQualified ? "bold" : "normal"}; color: ${isQualified ? "#C5A880" : "#A80000"};">
                    ${isQualified ? "PRE-QUALIFIED / HIGH PRIORITY" : "STANDARD INQUIRY"}
                  </td>
                </tr>
              </table>
              <div style="font-size: 11px; color: #8C8A84; text-align: center; border-top: 1px solid #E3DFD5; padding-top: 15px; margin-top: 20px;">
                Secure Lead Database System // KITESTUDIOS Curation Funnel
              </div>
            </div>
          `,
        });
        console.log("[Lead API] Email notification sent successfully!");
      } catch (emailErr) {
        console.error("[Lead API] Failed to send email notification:", emailErr);
      }
    } else {
      console.warn("[Lead API] SMTP credentials not set up. Skipping email notification to tomy@kitestudios.net.");
    }

    // 4. Send lead to Airtable if credentials are available
    const airtablePat = process.env.AIRTABLE_PAT;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

    if (airtablePat && airtableBaseId) {
      console.log(`[Lead API] Submitting to Airtable Base ${airtableBaseId}, Table: ${airtableTableName}`);
      const airtablePayload = {
        records: [
          {
            fields: {
              Name: fullName || "Unnamed Lead",
              Email: email || "",
              Phone: phone || "",
              "Clinic Name": clinicName || "",
              Website: sanitizedWebsite || "",
              Location: location || "",
              Revenue: revenue || "",
              Treatments: treatmentsStr || "",
              Acquisition: acquisitionStr || "",
              Traffic: hasTraffic || "",
              "Filming Ready": crewReady || "",
              Notes: summary,
              Source: "Website Quiz",
            },
          },
        ],
      };

      try {
        const response = await fetch(
          `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${airtablePat}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(airtablePayload),
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          console.error(`[Lead API] Airtable responded with error: ${response.status} - ${errText}`);
          return NextResponse.json({
            success: true, // Return success since we backed it up locally
            airtableSynced: false,
            message: "Application recorded locally, but failed to sync to CRM.",
          });
        }

        const resData = await response.json();
        console.log(`[Lead API] Successfully synced to Airtable:`, resData);
        return NextResponse.json({
          success: true,
          airtableSynced: true,
          message: "Application submitted and synced successfully.",
        });
      } catch (airtableErr) {
        console.error("[Lead API] Network error syncing to Airtable:", airtableErr);
        return NextResponse.json({
          success: true, // Return success since we backed it up locally
          airtableSynced: false,
          message: "Application recorded locally, CRM sync offline.",
        });
      }
    } else {
      console.warn("[Lead API] Airtable credentials missing. Local-only submission.");
      return NextResponse.json({
        success: true,
        airtableSynced: false,
        message: "Application saved locally (Airtable integration unconfigured).",
      });
    }
  } catch (err: any) {
    console.error("[Lead API] General Error processing lead:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
