import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { STORE_CONFIG } from "@/lib/config";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      name,
      phone,
      city,
      address,
      productTitle,
      productPrice,
      category,
      quantity = "1",
      notes = "",
    } = data;

    if (!name || !phone || !address || !productTitle) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 }
      );
    }

    const orderTime = new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Clean customer phone number for quick WhatsApp reply link in the email
    const cleanCustomerPhone = phone.replace(/\D/g, "");
    const quickReplyWhatsAppUrl = `https://wa.me/${cleanCustomerPhone}?text=${encodeURIComponent(
      `Assalam-o-Alaikum ${name}, thank you for ordering ${productTitle} from NOIR SCENTS! We are dispatching your parcel.`
    )}`;

    // Beautiful luxury HTML email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f7f6f2; margin: 0; padding: 20px; color: #1c1917; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e7e5e4; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
          .header { background-color: #0c0a09; color: #ffffff; padding: 25px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; letter-spacing: 4px; font-weight: 600; text-transform: uppercase; }
          .header p { margin: 5px 0 0; font-size: 11px; letter-spacing: 2px; color: #C2A676; text-transform: uppercase; }
          .badge { display: inline-block; background-color: #C2A676; color: #0c0a09; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 12px; border-radius: 20px; margin-top: 15px; }
          .content { padding: 30px; }
          .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #78716c; margin-bottom: 10px; font-weight: 700; border-bottom: 1px solid #f5f5f4; padding-bottom: 5px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          .table td { padding: 10px 0; border-bottom: 1px solid #f5f5f4; font-size: 14px; }
          .table td.label { color: #78716c; width: 40%; }
          .table td.value { color: #0c0a09; font-weight: 600; }
          .price-highlight { font-size: 18px; color: #0c0a09; font-weight: bold; }
          .whatsapp-btn { display: block; text-align: center; background-color: #25D366; color: #ffffff !important; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-weight: bold; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-top: 25px; box-shadow: 0 2px 6px rgba(37,211,102,0.3); }
          .footer { background: #fafaf9; padding: 20px; text-align: center; font-size: 11px; color: #a8a29e; border-top: 1px solid #f5f5f4; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NOIR SCENTS</h1>
            <p>Luxury Artisanal Perfumes</p>
            <span class="badge">New Order Received</span>
          </div>

          <div class="content">
            <div class="section-title">Product Details</div>
            <table class="table">
              <tr>
                <td class="label">Fragrance:</td>
                <td class="value">${productTitle}</td>
              </tr>
              <tr>
                <td class="label">Collection:</td>
                <td class="value">${category}</td>
              </tr>
              <tr>
                <td class="label">Quantity:</td>
                <td class="value">${quantity} Bottle(s)</td>
              </tr>
              <tr>
                <td class="label">Total Price:</td>
                <td class="value price-highlight">${productPrice}</td>
              </tr>
              <tr>
                <td class="label">Payment Type:</td>
                <td class="value">Cash on Delivery (COD)</td>
              </tr>
            </table>

            <div class="section-title">Customer & Delivery Information</div>
            <table class="table">
              <tr>
                <td class="label">Customer Name:</td>
                <td class="value">${name}</td>
              </tr>
              <tr>
                <td class="label">Phone / WhatsApp:</td>
                <td class="value"><a href="tel:${phone}" style="color: #0c0a09; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td class="label">Destination City:</td>
                <td class="value">${city}</td>
              </tr>
              <tr>
                <td class="label">Delivery Address:</td>
                <td class="value">${address}</td>
              </tr>
              ${notes ? `<tr><td class="label">Special Notes:</td><td class="value">${notes}</td></tr>` : ""}
              <tr>
                <td class="label">Order Time:</td>
                <td class="value">${orderTime}</td>
              </tr>
            </table>

            <a href="${quickReplyWhatsAppUrl}" target="_blank" class="whatsapp-btn">
              💬 Tap to Chat with Customer on WhatsApp
            </a>
          </div>

          <div class="footer">
            Automated Order Dispatch from NOIR SCENTS Online Store &bull; Recipient: ${STORE_CONFIG.ownerEmail}
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text alternative for fallback
    const emailText = `
NEW ORDER CONFIRMED - NOIR SCENTS
====================================
Product: ${productTitle} (${category})
Quantity: ${quantity}
Price: ${productPrice}
Payment: Cash on Delivery (COD)

CUSTOMER DETAILS:
Name: ${name}
Phone: ${phone}
City: ${city}
Address: ${address}
${notes ? `Notes: ${notes}\n` : ""}
Time: ${orderTime}

Quick WhatsApp link: ${quickReplyWhatsAppUrl}
    `.trim();

    // Check SMTP configuration
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    let emailSent = false;
    let emailStatusMessage = "";

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"NOIR SCENTS Store" <${smtpUser}>`,
          to: STORE_CONFIG.ownerEmail,
          subject: `📦 New Order: ${productTitle} (${productPrice}) - ${name} (${city})`,
          text: emailText,
          html: emailHtml,
        });

        emailSent = true;
        emailStatusMessage = "Email sent successfully to " + STORE_CONFIG.ownerEmail;
        console.log(`✓ Order email delivered to ${STORE_CONFIG.ownerEmail} for ${productTitle}`);
      } catch (mailError: any) {
        console.error("Failed to send order email:", mailError?.message || mailError);
        emailStatusMessage = `SMTP error: ${mailError?.message || "Unknown error"}`;
      }
    } else {
      console.log(
        `[Order Notification Log] Recipient: ${STORE_CONFIG.ownerEmail}\n${emailText}`
      );
      emailStatusMessage =
        "Order logged. To receive Gmail notifications, add SMTP_USER and SMTP_PASS to .env.local";
    }

    return NextResponse.json({
      success: true,
      emailSent,
      recipient: STORE_CONFIG.ownerEmail,
      message: emailStatusMessage,
    });
  } catch (error: any) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { error: "Internal server error while processing order" },
      { status: 500 }
    );
  }
}
