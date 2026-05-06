import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PartnershipForm from '../../src/sections/b2b/PartnershipForm';

function renderForm() {
  return render(<MemoryRouter><PartnershipForm /></MemoryRouter>);
}

describe('PartnershipForm', () => {
  it('renders all form fields', () => {
    renderForm();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell us about your trip/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/please tell us/i)).toBeInTheDocument();
  });

  it('shows email format error for invalid email', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/^email/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it('clears field error on input change', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));
    await screen.findByText(/name is required/i);
    await user.type(screen.getByLabelText(/name/i), 'Alice');
    await waitFor(() =>
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
    );
  });

  it('shows success message after valid submission', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/name/i), 'Alice');
    await user.type(screen.getByLabelText(/^email/i), 'alice@example.com');
    await user.type(screen.getByLabelText(/tell us about your trip/i), 'I want to go to Patagonia.');
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));
    expect(await screen.findByText(/inquiry received/i)).toBeInTheDocument();
  });
});
