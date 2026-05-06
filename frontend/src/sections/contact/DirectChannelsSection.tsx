import type { ContactChannel } from '../../types';
import './DirectChannelsSection.css';

const CHANNELS: ContactChannel[] = [
  { id: 'email', label: 'Email', value: 'hello@journeyandco.com', href: 'mailto:hello@journeyandco.com', type: 'email' },
  { id: 'whatsapp', label: 'WhatsApp', value: '+1 555 000 1234', href: 'https://wa.me/15550001234', type: 'whatsapp' },
  { id: 'instagram', label: 'Instagram', value: '@journeyandco', href: 'https://instagram.com/journeyandco', type: 'instagram' },
  { id: 'linkedin', label: 'LinkedIn', value: 'Journey & Co.', href: 'https://linkedin.com/company/journeyandco', type: 'linkedin' },
];

const ICONS: Record<ContactChannel['type'], React.ReactNode> = {
  email: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1 4l7 5 7-5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  whatsapp: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1a7 7 0 0 1 6.07 10.47L15 15l-3.6-.9A7 7 0 1 1 8 1z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6 6.5c.5 1 1.5 2 2.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  instagram: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="12" cy="4" r="0.6" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 7v5M4 4.5v.5M7 12V9c0-1 .5-2 2-2s2 1 2 2v3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
};

export default function DirectChannelsSection() {
  return (
    <section className="channels section" aria-label="Contact channels">
      <div className="container channels__inner">
        <div className="channels__intro">
          <h2>Find Us Here.</h2>
          <p>
            We're a small, responsive team. Reach out through whichever channel
            feels right — we typically reply within 24 hours.
          </p>
        </div>

        <ul className="channels__list">
          {CHANNELS.map((ch) => (
            <li key={ch.id} className="channel-item">
              <div className="channel-item__icon">{ICONS[ch.type]}</div>
              <div>
                <p className="channel-item__label">{ch.label}</p>
                <a
                  href={ch.href}
                  className="channel-item__value"
                  target={ch.type !== 'email' ? '_blank' : undefined}
                  rel={ch.type !== 'email' ? 'noopener noreferrer' : undefined}
                >
                  {ch.value}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
