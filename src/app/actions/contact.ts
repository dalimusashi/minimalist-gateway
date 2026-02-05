
'use server';

import { Resend } from 'resend';
import { z } from 'zod';

/**
 * Server action to handle dual-inbox email delivery.
 * Sends contact form data to both primary and secondary email addresses.
 */

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
});

const RECIPIENT_EMAIL_1 = 'ahoy@vibedot.com';
const RECIPIENT_EMAIL_2 = 'dalimusashi@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_placeholder_123';

const resend = new Resend(RESEND_API_KEY);

export async function sendContactEmail(formData: z.infer<typeof contactSchema>) {
  // Validate input server-side for security
  const result = contactSchema.safeParse(formData);
  
  if (!result.success) {
    return { success: false, error: 'Invalid form data' };
  }

  const { name, email, subject } = result.data;

  try {
    // Send to two recipients simultaneously
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Update with your verified domain
      to: [RECIPIENT_EMAIL_1, RECIPIENT_EMAIL_2],
      subject: `New Contact: ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nSubject: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111;">
          <h2 style="font-weight: 300; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Inquiry</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background: #f9f9f9; padding: 20px; margin-top: 20px;">
            ${subject}
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message || 'Failed to send emails' };
  }
}
