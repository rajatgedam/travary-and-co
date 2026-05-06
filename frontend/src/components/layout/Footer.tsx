import { useState, type FormEvent } from 'react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <span className="footer__brand">Travary &amp; Co.</span>
            <p className="footer__tagline">
              Curated journeys for the modern explorer — from soul-stirring
              group tours to white-glove corporate logistics.
            </p>
          </div>

          <div>
            <label htmlFor="newsletter-email" className="footer__newsletter-label">
              Get the next itinerary in your inbox.
            </label>
            {submitted ? (
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-green)' }}>
                You're on the list. See you out there.
              </p>
            ) : (
              <form className="footer__newsletter-form" onSubmit={handleSubmit}>
                <input
                  id="newsletter-email"
                  type="email"
                  className="footer__newsletter-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="footer__newsletter-btn">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Travary &amp; Co. All rights reserved.</span>
          <span>Made for the road less traveled.</span>
        </div>
      </div>
    </footer>
  );
}
