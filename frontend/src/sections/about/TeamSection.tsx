import PolaroidCard from '../../components/ui/PolaroidCard';
import type { TeamMember } from '../../types';
import './TeamSection.css';

const TEAM: TeamMember[] = [
  { id: '1', name: 'Layla Nasser', role: 'Co-founder & Head of Expeditions', imageAlt: 'Layla in the field', colorAccent: '#2d4a3e' },
  { id: '2', name: 'Yusuf Okafor', role: 'Co-founder & Logistics Director', imageAlt: 'Yusuf coordinating transport', colorAccent: '#b85c38' },
  { id: '3', name: 'Priya Mehta', role: 'Community & Partnerships', imageAlt: 'Priya at a local market', colorAccent: '#3b2a1a' },
  { id: '4', name: 'Cian Murphy', role: 'On-Ground Operations Lead', imageAlt: 'Cian scouting a route', colorAccent: '#1a3050' },
];

export default function TeamSection() {
  return (
    <section className="team-section section" aria-label="Our team">
      <div className="container">
        <div className="team-section__header">
          <h2>The People in the Field</h2>
          <p>
            A small team with an outsized obsession for getting travel right.
          </p>
        </div>
        <div className="team-section__grid">
          {TEAM.map((member) => (
            <PolaroidCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
