import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const { error } = await resend.emails.send({
    from: 'Travary & Co. <noreply@travaryandco.com>',
    to: 'partnerships@travaryandco.com',
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
