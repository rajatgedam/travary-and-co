import { useState, type FormEvent } from 'react';
import './PartnershipForm.css';

interface FormState {
  name: string;
  organization: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMPTY: FormState = { name: '', organization: '', email: '', message: '' };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.message.trim()) errors.message = 'Please tell us a bit about your request.';
  return errors;
}

export default function PartnershipForm() {
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
      const res = await fetch('/api/partnership', {
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
    <section className="partnership-form-section section" aria-label="Partnership inquiry">
      <div className="container partnership-form-section__inner">
        <div className="partnership-form-section__info">
          <h2>Let's Build Something Together</h2>
          <p>
            Tell us about your group, your goals, and where you want to go.
            We'll come back to you within 48 hours with an initial outline.
          </p>
          <ul className="partnership-form-section__channels">
            <li className="partnership-form-section__channel">
              <span>Email</span>
              <a href="mailto:partnerships@travaryandco.com">partnerships@travaryandco.com</a>
            </li>
            <li className="partnership-form-section__channel">
              <span>WhatsApp</span>
              <a href="https://wa.me/15550001234" target="_blank" rel="noopener noreferrer">+1 555 000 1234</a>
            </li>
          </ul>
        </div>

        {submitted ? (
          <div className="form-success" role="status">
            <h3>Inquiry Received.</h3>
            <p>We'll be in touch within 48 hours. In the meantime, pack lightly.</p>
          </div>
        ) : (
          <form className="partnership-form" onSubmit={handleSubmit} noValidate aria-label="Partnership inquiry form">
            <div className="form-field">
              <label htmlFor="p-name">Name</label>
              <input
                id="p-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'p-name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && <span id="p-name-error" className="form-error" role="alert">{errors.name}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="p-org">Organization <span>(optional)</span></label>
              <input
                id="p-org"
                name="organization"
                type="text"
                className="form-input"
                placeholder="Company or organization name"
                value={form.organization}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>

            <div className="form-field">
              <label htmlFor="p-email">Email</label>
              <input
                id="p-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'p-email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && <span id="p-email-error" className="form-error" role="alert">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="p-message">Tell us about your trip</label>
              <textarea
                id="p-message"
                name="message"
                className="form-textarea"
                placeholder="Group size, destination ideas, dates, goals..."
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'p-message-error' : undefined}
              />
              {errors.message && <span id="p-message-error" className="form-error" role="alert">{errors.message}</span>}
            </div>

            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? 'Sending…' : 'Send Inquiry'}
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
