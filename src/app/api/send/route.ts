import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();
    console.log(name, email, subject, message);

    const customerMessageOptions = {
      from: process.env.GMAIL_USER,
      to: "im.hnahk@gmail.com",
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #007bff;
            }
            .header h1 {
              color: #007bff;
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .contact-info {
              background-color: #e3f2fd;
              padding: 20px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .message-content {
              background-color: #f8f9fa;
              border-left: 4px solid #007bff;
              padding: 20px;
              margin: 20px 0;
              border-radius: 5px;
            }
            .highlight {
              color: #007bff;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Message</h1>
            </div>

            <div class="contact-info">
              <h3>👤 Contact Information</h3>
              <p><strong>Name:</strong> <span class="highlight">${name}</span></p>
              <p><strong>Email:</strong> <span class="highlight">${email}</span></p>
              <p><strong>Subject:</strong> <span class="highlight">${subject}</span></p>
            </div>

            <div class="message-content">
              <h3>💬 Message</h3>
              <p>${message}</p>
            </div>

            <p style="text-align: center; color: #6c757d; font-size: 14px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        </body>
        </html>
      `,
    };

    const confirmationOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #007bff;
            }
            .header h1 {
              color: #007bff;
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .content {
              margin-bottom: 30px;
            }
            .message-box {
              background-color: #f8f9fa;
              border-left: 4px solid #007bff;
              padding: 20px;
              margin: 20px 0;
              border-radius: 5px;
            }
            .message-box h3 {
              margin: 0 0 10px 0;
              color: #007bff;
              font-size: 18px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #dee2e6;
              color: #6c757d;
            }
            .highlight {
              color: #007bff;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Thank You! ✨</h1>
            </div>

            <div class="content">
              <p>Dear <span class="highlight">${name}</span>,</p>

              <p>Thank you for reaching out to me! I have received your message and I'm excited to connect with you.</p>

              <p>I will review your message carefully and get back to you as soon as possible, typically within 24-48 hours.</p>

              <div class="message-box">
                <h3>📧 Your Message Summary</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="font-style: italic; margin-left: 20px;">"${message}"</p>
              </div>

              <p>If you have any urgent matters, please don't hesitate to reach out again.</p>
            </div>

            <div class="footer">
              <p>Best regards,<br>
              <span class="highlight">Phùng Khánh</span></p>
              <p style="font-size: 14px; margin-top: 10px;">
                📧 ${process.env.GMAIL_USER}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(customerMessageOptions);
    await transporter.sendMail(confirmationOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
