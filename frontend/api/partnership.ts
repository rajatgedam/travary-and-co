import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Set in Vercel → Project Settings → Environment Variables
// RESEND_FROM:        e.g. "Travary & Co. <noreply@travaryandco.com>"  (must be a Resend-verified domain)
// PARTNERSHIP_TO:     e.g. "partnerships@travaryandco.com"  (inbox that receives partnership inquiries)
const FROM = process.env.RESEND_FROM    ?? 'onboarding@resend.dev';
const TO   = process.env.PARTNERSHIP_TO ?? '';

interface PartnershipPayload {
  name: string;
  email: string;
  organization?: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, organization, message } = req.body as PartnershipPayload;

  // Server-side validation
  if (!name?.trim()) return res.status(400).json({ error: 'Name is required.' });
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  if (!message?.trim()) return res.status(400).json({ error: 'Message is required.' });

  if (!TO) {
    console.error('PARTNERSHIP_TO env var is not set');
    return res.status(500).json({ error: 'Server misconfiguration. Please contact us directly.' });
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Partnership inquiry from ${name}${organization ? ` (${organization})` : ''}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : null,
      `Message:\n${message}`,
    ]
      .filter(Boolean)
      .join('\n'),
  });

  if (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send inquiry. Please try again.' });
  }

  return res.status(200).json({ ok: true });
}
