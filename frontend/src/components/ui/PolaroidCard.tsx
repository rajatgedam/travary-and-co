import type { TeamMember } from '../../types';
import './PolaroidCard.css';

interface Props {
  member: TeamMember;
}

export default function PolaroidCard({ member }: Props) {
  return (
    <figure className="polaroid" aria-label={`${member.name}, ${member.role}`}>
      <div
        className="polaroid__img"
        style={{ background: member.colorAccent }}
        role="img"
        aria-label={member.imageAlt}
      >
        {member.name.split(' ').map((w) => w[0]).join('')}
      </div>
      <figcaption className="polaroid__caption">
        <p className="polaroid__name">{member.name}</p>
        <p className="polaroid__role">{member.role}</p>
      </figcaption>
    </figure>
  );
}
