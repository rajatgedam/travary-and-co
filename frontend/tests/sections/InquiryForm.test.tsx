import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InquiryForm from '../../src/sections/contact/InquiryForm';

describe('InquiryForm', () => {
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

  it('shows success state after valid submission', async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);
    await user.type(screen.getByLabelText(/name/i), 'Bob');
    await user.type(screen.getByLabelText(/^email/i), 'bob@example.com');
    await user.type(screen.getByLabelText(/where do you want to go/i), 'Nepal');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/message received/i)).toBeInTheDocument();
  });
});
