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
      brandName,
      website,
      productCategory,
      salesChannels = [],
      revenue,
      contentChannels = [],
      readyToShip,
      firstName,
      lastName,
      email,
      phone,
      additionalInfo = "",
    } = body;

    // Sanitize website URL
    let sanitizedWebsite = (website || "").trim();
    if (sanitizedWebsite && !/^https?:\/\//i.test(sanitizedWebsite)) {
      sanitizedWebsite = `https://${sanitizedWebsite}`;
    }

    const salesChannelsStr = Array.isArray(salesChannels) ? salesChannels.join(", ") : salesChannels;
    const contentChannelsStr = Array.isArray(contentChannels) ? contentChannels.join(", ") : contentChannels;
    const fullName = `${firstName || ""} ${lastName || ""}`.trim();

    // Determine qualification status:
    // Prequalified if revenue is not the lowest tier and they are ready to ship samples within 30 days
    const isQualified =
      revenue !== "Under $10k/mo" &&
      readyToShip === "Yes, ready to ship immediately (next 14-30 days)";

    const summary = `
Product Photography Cohort Application
-----------------------------
Brand Name: ${brandName || "N/A"}
Website: ${sanitizedWebsite || "N/A"}
Product Category: ${productCategory || "N/A"}
Sales Channels: ${salesChannelsStr || "N/A"}
Monthly Store Revenue: ${revenue || "N/A"}
Current Content Channels: ${contentChannelsStr || "N/A"}
Ready to Ship Samples: ${readyToShip || "N/A"}
Additional Info: ${additionalInfo || "None"}

Contact Name: ${fullName || "N/A"}
Work Email: ${email || "N/A"}
Direct Phone: ${phone || "N/A"}
Vetting Status: ${isQualified ? "PRE-QUALIFIED / HIGH PRIORITY" : "STANDARD INQUIRY"}
    `.trim();

    // 1. Save local backup in data/product_photography_leads.json
    const leadData = {
      timestamp: new Date().toISOString(),
      fullName,
      email,
      phone,
      brandName,
      website: sanitizedWebsite,
      productCategory,
      salesChannels,
      revenue,
      contentChannels,
      readyToShip,
      additionalInfo,
      isQualified,
      summary,
    };

    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "product_photography_leads.json");
      let existingLeads = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        existingLeads = JSON.parse(fileContent || "[]");
      }
      existingLeads.push(leadData);
      fs.writeFileSync(filePath, JSON.stringify(existingLeads, null, 2), "utf-8");
      console.log(`[Product Photography Lead API] Saved locally to ${filePath}`);
    } catch (fsErr) {
      console.error("[Product Photography Lead API] Failed to write backup lead:", fsErr);
    }

    // 2. Meta Conversions API (CAPI) Tracking
    const metaPixelId = process.env.META_PIXEL_ID;
    const metaAccessToken = process.env.META_ACCESS_TOKEN;

    if (metaPixelId && metaAccessToken) {
      const userAgent = request.headers.get("user-agent") || "";
      const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0].trim() 
        || request.headers.get("x-real-ip") 
        || "127.0.0.1";
      const referer = request.headers.get("referer") || "https://kitestudios.net/product-photography";

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
              content_name: "Product Photography Cohort Application",
              content_category: "Product Lead Acquisition",
              value: 0.00,
              currency: "USD",
            },
          },
        ],
      };

      console.log(`[Product Photography Lead API] Submitting CAPI event: ${eventId}`);
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
          console.log("[Product Photography Lead API] Conversions API event sent:", capiResult);
        } else {
          console.error("[Product Photography Lead API] Conversions API responded with error:", capiResult);
        }
      } catch (capiErr) {
        console.error("[Product Photography Lead API] Failed sending to Meta Conversions API:", capiErr);
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
      console.log(`[Product Photography Lead API] Sending email notification to ${emailTo}`);
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
          from: `"KiteStudios Product Photo Funnel" <${emailFrom}>`,
          to: emailTo,
          subject: `${isQualified ? "🔥" : "✨"} New Product Photo Lead: ${brandName || fullName}`,
          text: summary,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1E293B; background-color: #0B0B0C; border-radius: 12px; color: #F1F5F9;">
              <h2 style="color: #F59E0B; font-family: sans-serif; text-transform: uppercase; margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid #1E293B; padding-bottom: 10px; letter-spacing: 0.05em;">
                Product Photo Cohort Application
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; color: #E2E8F0;">
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; width: 180px; color: #94A3B8;">Brand Name:</td>
                  <td style="padding: 10px 0; font-weight: 700;">${brandName || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Contact Name:</td>
                  <td style="padding: 10px 0;">${fullName || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Website:</td>
                  <td style="padding: 10px 0;"><a href="${sanitizedWebsite}" style="color: #F59E0B; text-decoration: none; font-weight: 550;">${sanitizedWebsite || "N/A"}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Category:</td>
                  <td style="padding: 10px 0;">${productCategory || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Sales Channels:</td>
                  <td style="padding: 10px 0;">${salesChannelsStr || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Monthly Revenue:</td>
                  <td style="padding: 10px 0;">${revenue || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Marketing Channels:</td>
                  <td style="padding: 10px 0;">${contentChannelsStr || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Ready to Ship Samples:</td>
                  <td style="padding: 10px 0;">${readyToShip || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Work Email:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #F59E0B; text-decoration: none;">${email || "N/A"}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Direct Phone:</td>
                  <td style="padding: 10px 0;">${phone || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1E293B;">
                  <td style="padding: 10px 0; font-weight: 600; color: #94A3B8;">Additional Info:</td>
                  <td style="padding: 10px 0; font-style: italic;">${additionalInfo || "None"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #94A3B8;">Vetting Determination:</td>
                  <td style="padding: 12px 0; font-weight: 700; color: ${isQualified ? "#F59E0B" : "#EF4444"}; font-size: 14px;">
                    ${isQualified ? "🔥 PRE-QUALIFIED / HIGH PRIORITY" : "STANDARD INQUIRY"}
                  </td>
                </tr>
              </table>
              <div style="font-size: 11px; color: #64748B; text-align: center; border-top: 1px solid #1E293B; padding-top: 15px; margin-top: 20px; font-family: monospace;">
                Secure Lead Database System // KITESTUDIOS Product Photo Cohort Funnel
              </div>
            </div>
          `,
        });
        console.log("[Product Photography Lead API] Email notification sent successfully!");
      } catch (emailErr) {
        console.error("[Product Photography Lead API] Failed to send email notification:", emailErr);
      }
    }

    // 4. Send lead to Airtable if credentials are available
    const airtablePat = process.env.AIRTABLE_PAT;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

    if (airtablePat && airtableBaseId) {
      console.log(`[Product Photography Lead API] Syncing to Airtable Table: ${airtableTableName}`);
      const airtablePayload = {
        records: [
          {
            fields: {
              Name: fullName || "Unnamed Lead",
              Email: email || "",
              Phone: phone || "",
              "Clinic Name": brandName || "", // Maps to company/clinic/brand field
              Website: sanitizedWebsite || "",
              Location: `Category: ${productCategory || "N/A"}, Channels: ${salesChannelsStr || "N/A"}`,
              Revenue: revenue || "",
              Treatments: contentChannelsStr || "",
              "Filming Ready": readyToShip || "",
              Notes: summary,
              Source: "Product Photography Quiz",
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
          console.error(`[Product Photography Lead API] Airtable error: ${response.status} - ${errText}`);
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
        console.error("[Product Photography Lead API] Network error syncing to Airtable:", airtableErr);
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
    console.error("[Product Photography Lead API] General Error processing lead:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
