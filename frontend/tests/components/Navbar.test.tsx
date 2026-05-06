import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../src/components/layout/Navbar';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Navbar', () => {
  it('renders the brand name', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/travary/i)).toBeInTheDocument();
  });

  it('renders all 4 navigation links', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /b2b trips/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('has a mobile menu toggle button with correct aria attributes', () => {
    renderWithRouter(<Navbar />);
    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles mobile menu open/closed', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Navbar />);
    const toggle = screen.getByRole('button', { name: /open menu/i });
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName(/close menu/i);
  });
});
