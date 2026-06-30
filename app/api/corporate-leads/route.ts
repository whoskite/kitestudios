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
  const cleaned = phone.replace(/\D/g, "");
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      eventId,
      companyName,
      website,
      industry,
      teamSize,
      marketingBudget,
      videoGoals = [],
      crewReady,
      firstName,
      lastName,
      email,
      phone,
    } = body;

    // Sanitize website URL
    let sanitizedWebsite = (website || "").trim();
    if (sanitizedWebsite && !/^https?:\/\//i.test(sanitizedWebsite)) {
      sanitizedWebsite = `https://${sanitizedWebsite}`;
    }

    const videoGoalsStr = Array.isArray(videoGoals) ? videoGoals.join(", ") : videoGoals;
    const fullName = `${firstName || ""} ${lastName || ""}`.trim();

    // Determine qualification status
    const isMediumOrLarge = ["11-50", "51-200", "201+"].includes(teamSize || "");
    const hasBudget = ["$5k - $20k/mo", "$20k - $50k/mo", "$50k+/mo"].includes(marketingBudget || "");
    const isReady = crewReady === "Yes, ready to schedule (next 30-60 days)";
    const isQualified = (isMediumOrLarge || hasBudget) && isReady;

    const summary = `
Executive Brand Film Cohort Application
-----------------------------
Company Name: ${companyName || "N/A"}
Website: ${sanitizedWebsite || "N/A"}
Industry: ${industry || "N/A"}
Company Size: ${teamSize || "N/A"}
Marketing Budget: ${marketingBudget || "N/A"}
Video Objectives: ${videoGoalsStr || "N/A"}
Filming Timeline: ${crewReady || "N/A"}

Executive Contact: ${fullName || "N/A"}
Work Email: ${email || "N/A"}
Direct Phone: ${phone || "N/A"}
Vetting Status: ${isQualified ? "PRE-QUALIFIED / HIGH PRIORITY" : "STANDARD INQUIRY"}
    `.trim();

    // 1. Save local backup in data/corporate_leads.json
    const leadData = {
      timestamp: new Date().toISOString(),
      fullName,
      email,
      phone,
      companyName,
      website: sanitizedWebsite,
      industry,
      teamSize,
      marketingBudget,
      videoGoals,
      crewReady,
      isQualified,
      summary,
    };

    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "corporate_leads.json");
      let existingLeads = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        existingLeads = JSON.parse(fileContent || "[]");
      }
      existingLeads.push(leadData);
      fs.writeFileSync(filePath, JSON.stringify(existingLeads, null, 2), "utf-8");
      console.log(`[Corporate Lead API] Saved locally to ${filePath}`);
    } catch (fsErr) {
      console.error("[Corporate Lead API] Failed to write backup lead:", fsErr);
    }

    // 2. Meta Conversions API (CAPI) Tracking
    const metaPixelId = process.env.META_PIXEL_ID;
    const metaAccessToken = process.env.META_ACCESS_TOKEN;

    if (metaPixelId && metaAccessToken) {
      const userAgent = request.headers.get("user-agent") || "";
      const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0].trim() 
        || request.headers.get("x-real-ip") 
        || "127.0.0.1";
      const referer = request.headers.get("referer") || "https://kitestudios.net/corporate";

      const hashedEmail = hashData(email);
      const hashedPhone = hashPhone(phone);
      const hashedFirstName = hashData(firstName);
      const hashedLastName = hashData(lastName);

      const capiPayload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId || `lead_fallback_${Date.now()}`,
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
              content_name: "Corporate Executive Film Cohort Application",
              content_category: "Corporate Lead Acquisition",
              value: 0.00,
              currency: "USD",
            },
          },
        ],
      };

      console.log(`[Corporate Lead API] Submitting CAPI event: ${eventId}`);
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
          console.log("[Corporate Lead API] Conversions API event sent:", capiResult);
        } else {
          console.error("[Corporate Lead API] Conversions API responded with error:", capiResult);
        }
      } catch (capiErr) {
        console.error("[Corporate Lead API] Failed sending to Meta Conversions API:", capiErr);
      }
    }

    // 3. Email Notification to admin (SMTP)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailTo = process.env.EMAIL_TO || "tomy@kitestudios.net";
    const emailFrom = process.env.EMAIL_FROM || "no-reply@kitestudios.net";

    if (smtpHost && smtpUser && smtpPass) {
      console.log(`[Corporate Lead API] Sending email notification to ${emailTo}`);
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
          from: `"KiteStudios Corporate Funnel" <${emailFrom}>`,
          to: emailTo,
          subject: `${isQualified ? "🔥" : "✨"} New Corporate Lead: ${companyName || fullName}`,
          text: summary,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1E293B; background-color: #0B0F19; border-radius: 12px; color: #F1F5F9;">
              <h2 style="color: #38BDF8; font-family: sans-serif; text-transform: uppercase; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #1E293B; padding-bottom: 10px; letter-spacing: 0.05em;">
                Executive Cohort Application
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; color: #E2E8F0;">
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; width: 180px; color: #94A3B8;">Company Name:</td>
                  <td style="padding: 10px 0; font-weight: 700;">${companyName || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Contact Name:</td>
                  <td style="padding: 10px 0;">${fullName || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Website:</td>
                  <td style="padding: 10px 0;"><a href="${sanitizedWebsite}" style="color: #38BDF8; text-decoration: none; font-weight: 550;">${sanitizedWebsite || "N/A"}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Primary Industry:</td>
                  <td style="padding: 10px 0;">${industry || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Company Size:</td>
                  <td style="padding: 10px 0;">${teamSize || "N/A"} employees</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Marketing Budget:</td>
                  <td style="padding: 10px 0;">${marketingBudget || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Objectives:</td>
                  <td style="padding: 10px 0;">${videoGoalsStr || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">On-Site Readiness:</td>
                  <td style="padding: 10px 0;">${crewReady || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Work Email:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #38BDF8; text-decoration: none;">${email || "N/A"}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Direct Phone:</td>
                  <td style="padding: 10px 0;">${phone || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #94A3B8;">Vetting Determination:</td>
                  <td style="padding: 12px 0; font-weight: 700; color: ${isQualified ? "#38BDF8" : "#EF4444"}; font-size: 14px;">
                    ${isQualified ? "🔥 PRE-QUALIFIED / HIGH PRIORITY" : "STANDARD INQUIRY"}
                  </td>
                </tr>
              </table>
              <div style="font-size: 11px; color: #64748B; text-align: center; border-top: 1px solid #1E293B; padding-top: 15px; margin-top: 20px; font-family: monospace;">
                Secure Lead Database System // KITESTUDIOS Corporate Cohort Funnel
              </div>
            </div>
          `,
        });
        console.log("[Corporate Lead API] Email notification sent successfully!");
      } catch (emailErr) {
        console.error("[Corporate Lead API] Failed to send email notification:", emailErr);
      }
    }

    // 4. Send lead to Airtable if credentials are available
    const airtablePat = process.env.AIRTABLE_PAT;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

    if (airtablePat && airtableBaseId) {
      console.log(`[Corporate Lead API] Syncing to Airtable Table: ${airtableTableName}`);
      const airtablePayload = {
        records: [
          {
            fields: {
              Name: fullName || "Unnamed Lead",
              Email: email || "",
              Phone: phone || "",
              "Clinic Name": companyName || "", // Maps to company/clinic field in airtable
              Website: sanitizedWebsite || "",
              Location: `Industry: ${industry || "N/A"}, Size: ${teamSize || "N/A"}`,
              Revenue: marketingBudget || "",
              Treatments: videoGoalsStr || "",
              "Filming Ready": crewReady || "",
              Notes: summary,
              Source: "Corporate Quiz",
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
          console.error(`[Corporate Lead API] Airtable error: ${response.status} - ${errText}`);
          return NextResponse.json({
            success: true,
            airtableSynced: false,
            message: "Recorded locally, Airtable sync failed.",
          });
        }

        return NextResponse.json({
          success: true,
          airtableSynced: true,
          message: "Application submitted and synced to CRM.",
        });
      } catch (airtableErr) {
        console.error("[Corporate Lead API] Network error syncing to Airtable:", airtableErr);
        return NextResponse.json({
          success: true,
          airtableSynced: false,
          message: "Recorded locally, CRM offline.",
        });
      }
    }

    return NextResponse.json({
      success: true,
      airtableSynced: false,
      message: "Application recorded locally.",
    });
  } catch (err: any) {
    console.error("[Corporate Lead API] General Error processing lead:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
