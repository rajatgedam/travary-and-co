import './VisionSection.css';

export default function VisionSection() {
  return (
    <section className="vision section" aria-label="Our vision for B2B travel">
      <div className="container vision__inner">
        <div>
          <p className="vision__eyebrow">For Partners</p>
          <h2 className="vision__title">
            Precision Logistics.<br />Extraordinary Journeys.
          </h2>
        </div>
        <div>
          <p className="vision__body">
            We don't just sell trips — we engineer them. For corporate teams,
            NGOs, and organizational groups, we bring the same editorial eye
            we use for our community travels to the demands of professional
            group logistics. End-to-end ownership, on-ground presence, and a
            relentless focus on execution so your group can focus on the
            experience.
          </p>
          <div className="vision__stats">
            <div className="vision__stat">
              <p className="vision__stat-number">40+</p>
              <p className="vision__stat-label">Corporate groups managed</p>
            </div>
            <div className="vision__stat">
              <p className="vision__stat-number">18</p>
              <p className="vision__stat-label">Countries covered</p>
            </div>
            <div className="vision__stat">
              <p className="vision__stat-number">100%</p>
              <p className="vision__stat-label">On-time departure rate</p>
            </div>
            <div className="vision__stat">
              <p className="vision__stat-number">6</p>
              <p className="vision__stat-label">Years in operation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
