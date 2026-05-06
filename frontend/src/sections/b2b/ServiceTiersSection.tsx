import ServiceTierCard from '../../components/ui/ServiceTierCard';
import type { ServiceTier } from '../../types';
import './ServiceTiersSection.css';

const TIERS: ServiceTier[] = [
  {
    id: 'custom',
    title: 'Custom Itineraries',
    description:
      "Tailored routes designed around your group's specific persona, goals, and schedule. No template trips.",
    features: [
      'Destination research & route planning',
      'Day-by-day itinerary design',
      'Cultural & activity curation',
      'Pre-trip briefing materials',
    ],
  },
  {
    id: 'logistics',
    title: 'On-Ground Logistics',
    description:
      "End-to-end transport, accommodation, and on-ground support. We're there so you don't have to worry.",
    features: [
      'Airport transfers & inter-city transport',
      'Hotel and camp accommodation management',
      'Local guide coordination',
      '24/7 on-trip support contact',
    ],
  },
  {
    id: 'branding',
    title: 'Branding & Execution',
    description:
      'White-label tours that carry your brand identity. From custom collateral to branded experiences.',
    features: [
      'White-label tour packaging',
      'Branded itinerary documents',
      'Custom group merchandise options',
      'Post-trip recap reports',
    ],
  },
];

const ICONS = [
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" key="map" aria-hidden="true"><path d="M1 3l5 2 6-2 5 2v12l-5-2-6 2-5-2V3z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/><path d="M6 5v12M12 3v12" stroke="currentColor" strokeWidth="1.1"/></svg>,
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" key="loc" aria-hidden="true"><path d="M9 1a6 6 0 0 1 6 6c0 4-6 10-6 10S3 11 3 7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.1"/><circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.1"/></svg>,
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" key="star" aria-hidden="true"><path d="M9 1l2 6h6l-5 4 2 6-5-4-5 4 2-6L1 7h6L9 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>,
];

export default function ServiceTiersSection() {
  return (
    <section className="service-tiers section" aria-label="Service tiers">
      <div className="container">
        <div className="service-tiers__header">
          <h2>What We Offer</h2>
          <p className="service-tiers__subtitle">
            Three engagement models — each one built for a different kind of
            partner relationship.
          </p>
        </div>
        <div className="service-tiers__grid">
          {TIERS.map((tier, i) => (
            <ServiceTierCard key={tier.id} tier={tier} icon={ICONS[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
