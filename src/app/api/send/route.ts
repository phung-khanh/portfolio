import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();
    console.log(name, email, subject, message);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["im.phungkhanh@gmail.com"],
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
      `,
    });

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting me!",
      text: `
Dear ${name},

Thank you for reaching out! I have received your message and will get back to you as soon as possible.

Here's a copy of your message:
Subject: ${subject}
Message: ${message}

Best regards,
Your Name
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
