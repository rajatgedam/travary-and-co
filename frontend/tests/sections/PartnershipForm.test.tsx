import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PartnershipForm from '../../src/sections/b2b/PartnershipForm';

function renderForm() {
  return render(<MemoryRouter><PartnershipForm /></MemoryRouter>);
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), 'Alice');
  await user.type(screen.getByLabelText(/^email/i), 'alice@example.com');
  await user.type(screen.getByLabelText(/tell us about your trip/i), 'I want to go to Patagonia.');
}

describe('PartnershipForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

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

  it('shows loading state while submitting', async () => {
    const user = userEvent.setup();
    let resolve!: (v: Response) => void;
    vi.mocked(fetch).mockReturnValue(new Promise((r) => { resolve = r; }) as Promise<Response>);
    renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));
    expect(await screen.findByRole('button', { name: /sending/i })).toBeDisabled();
    resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }));
  });

  it('shows success message after valid submission', async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));
    expect(await screen.findByText(/inquiry received/i)).toBeInTheDocument();
  });

  it('shows server error when API returns non-2xx', async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: 'Failed to send inquiry. Please try again.' }), { status: 500 })
    );
    renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));
    expect(await screen.findByText(/failed to send inquiry/i)).toBeInTheDocument();
  });

  it('shows network error when fetch throws', async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockRejectedValue(new Error('Network failure'));
    renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send inquiry/i }));
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });
});
