import { useState, type FormEvent } from 'react';
import './InquiryForm.css';
import '../b2b/PartnershipForm.css';

interface FormState {
  name: string;
  organization: string;
  destination: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  destination?: string;
}

const EMPTY: FormState = { name: '', organization: '', destination: '', email: '' };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.destination.trim()) errors.destination = 'Please tell us where you want to go.';
  return errors;
}

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError((data as { error?: string }).error ?? 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
      setForm(EMPTY);
      setErrors({});
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="inquiry-section section" aria-label="General inquiry form">
      <div className="container">
        <div className="inquiry-section__header">
          <h2>Where Do You Want to Go?</h2>
          <p>
            Fill in the form and we'll reach back with ideas, availability,
            and a price estimate.
          </p>
        </div>

        {submitted ? (
          <div className="form-success-full" role="status">
            <h3>Message Received.</h3>
            <p>We'll be in touch soon. Start thinking about what to pack.</p>
          </div>
        ) : (
          <form className="inquiry-form" onSubmit={handleSubmit} noValidate aria-label="Inquiry form">
            <div className="form-field">
              <label htmlFor="i-name">Name</label>
              <input
                id="i-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'i-name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && <span id="i-name-error" className="form-error" role="alert">{errors.name}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="i-email">Email</label>
              <input
                id="i-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'i-email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && <span id="i-email-error" className="form-error" role="alert">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="i-org">Organization <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(optional)</span></label>
              <input
                id="i-org"
                name="organization"
                type="text"
                className="form-input"
                placeholder="Company or group name"
                value={form.organization}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>

            <div className="form-field">
              <label htmlFor="i-destination">Where do you want to go?</label>
              <input
                id="i-destination"
                name="destination"
                type="text"
                className="form-input"
                placeholder="A country, region, or idea"
                value={form.destination}
                onChange={handleChange}
                aria-invalid={!!errors.destination}
                aria-describedby={errors.destination ? 'i-dest-error' : undefined}
              />
              {errors.destination && <span id="i-dest-error" className="form-error" role="alert">{errors.destination}</span>}
            </div>

            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? 'Sending…' : 'Send Message'}
              {!loading && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            {serverError && <p className="form-error form-error--server" role="alert">{serverError}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
