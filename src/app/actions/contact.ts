"use server";

import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
});

const RECIPIENT_EMAIL_1 = "ahoy@vibedot.com";
const RECIPIENT_EMAIL_2 = "dalimusashi@gmail.com";

export async function sendContactEmail(
  formData: z.infer<typeof contactSchema>
): Promise<{ success: boolean; error?: string }> {
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  const { name, email, subject } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Email service not configured (missing RESEND_API_KEY).",
    };
  }

  const resend = new Resend('apiKey');

  try {
    await resend.emails.send({
      // Keep onboarding@resend.dev until you verify your domain in Resend
      from: "Dali — Portfolio <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL_1, RECIPIENT_EMAIL_2],
      subject: `New inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nSubject:\n${subject}`,
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #111;">
          <h2 style="margin: 0 0 16px; font-weight: 600;">New Contact</h2>
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 16px;"><strong>Email:</strong> ${escapeHtml(
            email
          )}</p>
          <div style="background: #f7f7f7; padding: 16px; border-left: 4px solid #000; white-space: pre-wrap;">${escapeHtml(
            subject
          )}</div>
        </div>
      `,
    });

    return { success: true };
  } catch (err: any) {
    // Helpful but still safe error message
    return { success: false, error: "Failed to send message. Please try again." };
  }
}

// Basic HTML escaping to avoid injection in email template
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
