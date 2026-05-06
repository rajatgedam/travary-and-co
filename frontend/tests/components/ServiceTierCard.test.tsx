import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServiceTierCard from '../../src/components/ui/ServiceTierCard';
import type { ServiceTier } from '../../src/types';

const MOCK_TIER: ServiceTier = {
  id: 'test',
  title: 'Test Tier',
  description: 'A test service tier description.',
  features: ['Feature One', 'Feature Two', 'Feature Three'],
};

describe('ServiceTierCard', () => {
  it('renders the tier title', () => {
    render(<ServiceTierCard tier={MOCK_TIER} icon={<span>icon</span>} />);
    expect(screen.getByText('Test Tier')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ServiceTierCard tier={MOCK_TIER} icon={<span>icon</span>} />);
    expect(screen.getByText('A test service tier description.')).toBeInTheDocument();
  });

  it('renders all features', () => {
    render(<ServiceTierCard tier={MOCK_TIER} icon={<span>icon</span>} />);
    expect(screen.getByText('Feature One')).toBeInTheDocument();
    expect(screen.getByText('Feature Two')).toBeInTheDocument();
    expect(screen.getByText('Feature Three')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<ServiceTierCard tier={MOCK_TIER} icon={<span>TestIcon</span>} />);
    expect(screen.getByText('TestIcon')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<ServiceTierCard tier={MOCK_TIER} icon={<span>icon</span>} />);
    expect(screen.getByRole('article', { name: 'Test Tier' })).toBeInTheDocument();
  });
});
