import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../../src/components/layout/Footer';

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getAllByText(/travary/i).length).toBeGreaterThan(0);
  });

  it('renders the newsletter label', () => {
    render(<Footer />);
    expect(screen.getByText(/get the next itinerary/i)).toBeInTheDocument();
  });

  it('renders the email input and subscribe button', () => {
    render(<Footer />);
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('shows success message after valid email submitted', async () => {
    const user = userEvent.setup();
    render(<Footer />);
    await user.type(screen.getByPlaceholderText(/your@email.com/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
  });

  it('does not submit with empty email', async () => {
    const user = userEvent.setup();
    render(<Footer />);
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(screen.queryByText(/you're on the list/i)).not.toBeInTheDocument();
  });
});
