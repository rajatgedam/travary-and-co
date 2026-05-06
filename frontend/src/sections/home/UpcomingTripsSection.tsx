import { Link } from 'react-router-dom';
import './UpcomingTripsSection.css';

export default function UpcomingTripsSection() {
  return (
    <section className="upcoming section" aria-label="Upcoming trips">
      <div className="container upcoming__inner">
        <div>
          <p className="upcoming__label">Featured Trip</p>
          <h2 className="upcoming__title">Caucasus Wild — Georgia &amp; Armenia</h2>

          <div className="upcoming__meta">
            <div className="upcoming__meta-item">
              <span className="upcoming__meta-key">Departs</span>
              <span className="upcoming__meta-value">October 2026</span>
            </div>
            <div className="upcoming__meta-item">
              <span className="upcoming__meta-key">Duration</span>
              <span className="upcoming__meta-value">12 days</span>
            </div>
            <div className="upcoming__meta-item">
              <span className="upcoming__meta-key">Spots</span>
              <span className="upcoming__meta-value">8 left</span>
            </div>
          </div>

          <p className="upcoming__body">
            Ancient monasteries carved into cliff faces, mountain passes rarely
            on any map, and food that rewrites what you thought you knew about
            hospitality. We handle everything — you just show up.
          </p>

          <Link to="/contact" className="upcoming__cta">
            Book Your Spot
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="upcoming__card" aria-label="Caucasus Wild trip image placeholder" role="img">
          <div className="upcoming__card-bg">
            <span className="upcoming__card-badge">Departing Oct 2026</span>
            <p className="upcoming__card-text">Caucasus</p>
          </div>
        </div>
      </div>
    </section>
  );
}
