import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import type { Trip } from '../../types';
import './PastTripsCarousel.css';

const PAST_TRIPS: Trip[] = [
  { id: '1', title: 'Patagonia Traverse', location: 'Chile & Argentina', duration: '14 days', departureDate: 'Mar 2025', imageAlt: 'Patagonia mountains', colorAccent: '#1a3a2e' },
  { id: '2', title: 'Leh–Ladakh Circuit', location: 'Northern India', duration: '10 days', departureDate: 'Sep 2024', imageAlt: 'Ladakh monastery', colorAccent: '#3b2a1a' },
  { id: '3', title: 'Atlas High Roads', location: 'Morocco', duration: '8 days', departureDate: 'Apr 2025', imageAlt: 'Atlas mountains Morocco', colorAccent: '#2a1f12' },
  { id: '4', title: 'Norwegian Fjordlands', location: 'Norway', duration: '12 days', departureDate: 'Jun 2024', imageAlt: 'Norwegian fjords', colorAccent: '#12212a' },
  { id: '5', title: 'Silk Road Fragments', location: 'Uzbekistan', duration: '9 days', departureDate: 'Oct 2024', imageAlt: 'Samarkand architecture', colorAccent: '#2a1a12' },
];

export default function PastTripsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="carousel-section section" aria-label="Past trips">
      <div className="container">
        <div className="carousel-section__header">
          <div>
            <h2>Where We've Been</h2>
            <p className="carousel-section__subtitle">
              A selection of recent expeditions — each one mapped, managed, and
              meaningful.
            </p>
          </div>
          <div className="carousel-section__controls">
            <button
              className="carousel-section__btn"
              onClick={scrollPrev}
              aria-label="Previous trips"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="carousel-section__btn"
              onClick={scrollNext}
              aria-label="Next trips"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {PAST_TRIPS.map((trip) => (
              <div className="embla__slide" key={trip.id}>
                <article className="trip-card" aria-label={trip.title}>
                  <div
                    className="trip-card__img"
                    style={{ background: trip.colorAccent }}
                    aria-label={trip.imageAlt}
                    role="img"
                  >
                    {trip.title.split(' ')[0]}
                    <div className="trip-card__overlay" aria-hidden="true" />
                  </div>
                  <div className="trip-card__info">
                    <p className="trip-card__location">{trip.location}</p>
                    <h3 className="trip-card__title">{trip.title}</h3>
                    <p className="trip-card__duration">{trip.duration} · {trip.departureDate}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
