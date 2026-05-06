import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__content">
        <p className="hero__eyebrow">Curated Travel Experiences</p>
        <h1 className="hero__title">
          Curated Journeys for<br />the Modern Explorer.
        </h1>
        <p className="hero__body">
          The path less traveled is usually unpaved. We specialize in mapping
          journeys that go beyond the guidebook — from professional logistics
          to soul-stirring group tours.
        </p>
        <Link to="/contact" className="hero__cta">
          Book Your Spot
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <span className="hero__scroll-hint" aria-hidden="true">Scroll</span>
    </section>
  );
}
