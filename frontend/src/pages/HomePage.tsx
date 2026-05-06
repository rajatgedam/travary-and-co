import HeroSection from '../sections/home/HeroSection';
import PastTripsCarousel from '../sections/home/PastTripsCarousel';
import UpcomingTripsSection from '../sections/home/UpcomingTripsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PastTripsCarousel />
      <UpcomingTripsSection />
    </>
  );
}
