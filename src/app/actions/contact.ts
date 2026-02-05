'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Message is required"),
});

const RECIPIENT_EMAIL_1 = 'ahoy@vibedot.com';
const RECIPIENT_EMAIL_2 = 'dalimusashi@gmail.com';

export async function sendContactEmail(formData: z.infer<typeof contactSchema>) {
  const result = contactSchema.safeParse(formData);
  
  if (!result.success) {
    return { success: false, error: 'Invalid form data' };
  }

  const { name, email, subject } = result.data;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return { success: false, error: 'Email service not configured. Please add RESEND_API_KEY in your settings.' };
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { firestore } = initializeFirebase();
    
    // 1. Log to Firestore (Backup)
    addDoc(collection(firestore, 'contactFormSubmissions'), {
      name,
      email,
      subject,
      submittedAt: serverTimestamp(),
      id: crypto.randomUUID(),
    });

    // 2. Send to both recipients
    await resend.emails.send({
      from: 'Gabriel Duro Site <onboarding@resend.dev>',
      to: [RECIPIENT_EMAIL_1, RECIPIENT_EMAIL_2],
      subject: `New Inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111;">
          <h2 style="font-weight: 300; border-bottom: 1px solid #eee; padding-bottom: 10px; text-transform: uppercase;">New Contact</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <div style="background: #fafafa; padding: 20px; margin-top: 20px; border-left: 4px solid #000;">
            ${subject}
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: 'Service temporarily unavailable.' };
  }
}
