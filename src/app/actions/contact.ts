
'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Server action to handle dual-inbox email delivery and Firestore logging.
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
    // 1. Log to Firestore (Backend Backup)
    const { firestore } = initializeFirebase();
    await addDoc(collection(firestore, 'contactFormSubmissions'), {
      name,
      email,
      subject,
      submittedAt: serverTimestamp(),
      id: crypto.randomUUID(), // For consistency with backend.json expectations
    });

    // 2. Send to two recipients simultaneously via Resend
    // Note: If you haven't added a domain to Resend yet, use 'onboarding@resend.dev'
    await resend.emails.send({
      from: 'Gabriel Duro Design <onboarding@resend.dev>',
      to: [RECIPIENT_EMAIL_1, RECIPIENT_EMAIL_2],
      subject: `New Inquiry: ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111; border: 1px solid #eee;">
          <h2 style="font-weight: 300; border-bottom: 1px solid #eee; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">New Contact</h2>
          <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background: #fafafa; padding: 20px; margin-top: 20px; border-left: 4px solid #000;">
            ${subject}
          </div>
          <p style="font-size: 10px; color: #999; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px;">
            Submitted via gabrielduro.com
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Action failed:', error);
    return { success: false, error: 'Service temporarily unavailable. Please try again.' };
  }
}
