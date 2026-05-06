import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PolaroidCard from '../../src/components/ui/PolaroidCard';
import type { TeamMember } from '../../src/types';

const MOCK_MEMBER: TeamMember = {
  id: '1',
  name: 'Jane Doe',
  role: 'Lead Explorer',
  imageAlt: 'Jane in the field',
  colorAccent: '#2d4a3e',
};

describe('PolaroidCard', () => {
  it('renders the member name', () => {
    render(<PolaroidCard member={MOCK_MEMBER} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders the member role', () => {
    render(<PolaroidCard member={MOCK_MEMBER} />);
    expect(screen.getByText('Lead Explorer')).toBeInTheDocument();
  });

  it('renders initials in the image placeholder', () => {
    render(<PolaroidCard member={MOCK_MEMBER} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('has accessible label combining name and role', () => {
    render(<PolaroidCard member={MOCK_MEMBER} />);
    expect(screen.getByRole('figure', { name: /Jane Doe.*Lead Explorer/i })).toBeInTheDocument();
  });
});
