import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InquiryForm from '../../src/sections/contact/InquiryForm';

function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  return async () => {
    await user.type(screen.getByLabelText(/name/i), 'Bob');
    await user.type(screen.getByLabelText(/^email/i), 'bob@example.com');
    await user.type(screen.getByLabelText(/where do you want to go/i), 'Nepal');
  };
}

describe('InquiryForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders all required fields', () => {
    render(<InquiryForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/where do you want to go/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/please tell us where/i)).toBeInTheDocument();
  });

  it('shows email format error for invalid email', async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);
    await user.type(screen.getByLabelText(/^email/i), 'bad-email');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it('clears field error on correction', async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    await screen.findByText(/name is required/i);
    await user.type(screen.getByLabelText(/name/i), 'Bob');
    await waitFor(() =>
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
    );
  });

  it('shows loading state while submitting', async () => {
    const user = userEvent.setup();
    let resolve!: (v: Response) => void;
    vi.mocked(fetch).mockReturnValue(new Promise((r) => { resolve = r; }) as Promise<Response>);
    render(<InquiryForm />);
    await fillValidForm(user)();
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('button', { name: /sending/i })).toBeDisabled();
    resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }));
  });

  it('shows success state after valid submission', async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    render(<InquiryForm />);
    await fillValidForm(user)();
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/message received/i)).toBeInTheDocument();
  });

  it('shows server error when API returns non-2xx', async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: 'Failed to send message. Please try again.' }), { status: 500 })
    );
    render(<InquiryForm />);
    await fillValidForm(user)();
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/failed to send message/i)).toBeInTheDocument();
  });

  it('shows network error when fetch throws', async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockRejectedValue(new Error('Network failure'));
    render(<InquiryForm />);
    await fillValidForm(user)();
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });
});
