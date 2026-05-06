import type { ServiceTier } from '../../types';
import './ServiceTierCard.css';

interface Props {
  tier: ServiceTier;
  icon: React.ReactNode;
}

export default function ServiceTierCard({ tier, icon }: Props) {
  return (
    <article className="service-tier" aria-label={tier.title}>
      <div className="service-tier__icon" aria-hidden="true">{icon}</div>
      <h3 className="service-tier__title">{tier.title}</h3>
      <p className="service-tier__description">{tier.description}</p>
      <ul className="service-tier__features" aria-label="Features">
        {tier.features.map((f) => (
          <li key={f} className="service-tier__feature">{f}</li>
        ))}
      </ul>
    </article>
  );
}
