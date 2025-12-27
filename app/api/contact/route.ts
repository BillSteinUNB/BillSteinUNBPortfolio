import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Simple HTML escape function to prevent XSS (avoids jsdom/DOMPurify ESM issues)
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Lazily initialize Resend to avoid build-time errors when API key is not set
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
};

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    // Check if Resend API key is configured
    const resend = getResendClient();
    if (!resend) {
      return NextResponse.json(
        { error: "Email service not configured. Please add RESEND_API_KEY to environment variables." },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Sanitize all user inputs to prevent XSS attacks
    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedMessage = escapeHtml(message).replace(/\n/g, "<br>");

    // Send email using Resend
    const data = await resend.emails.send({
      from: "Contact <contact@billstein.dev>",
      to: process.env.CONTACT_EMAIL || "contact@billstein.dev",
      reply_to: email,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage}</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    // Log errors in development only
    if (process.env.NODE_ENV === 'development') {
      console.error("Contact form error:", error);
    }
    // TODO: Add error tracking service for production monitoring
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
