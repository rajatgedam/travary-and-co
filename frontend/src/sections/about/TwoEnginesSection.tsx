import './TwoEnginesSection.css';

export default function TwoEnginesSection() {
  return (
    <section className="two-engines section" aria-label="Two engines concept">
      <div className="container">
        <div className="two-engines__header">
          <h2>Two Engines. One Direction.</h2>
          <p>
            Journey &amp; Co. operates two complementary brands — each with a
            distinct focus, united by the same commitment to craft.
          </p>
        </div>

        <div className="two-engines__grid">
          <div className="engine-card engine-card--community">
            <span className="engine-card__tag">Engine 01</span>
            <h3 className="engine-card__title">Community Journeys</h3>
            <p className="engine-card__body">
              Small-group travel designed around shared curiosity. Open to
              anyone — bound together by the desire to go further. Our
              community trips emphasize immersion, local connection, and the
              kind of slow travel that changes how you see the world.
            </p>
            <span className="engine-card__number" aria-hidden="true">01</span>
          </div>

          <div className="engine-card engine-card--logistics">
            <span className="engine-card__tag">Engine 02</span>
            <h3 className="engine-card__title">Corporate &amp; Org Logistics</h3>
            <p className="engine-card__body">
              Precision-engineered travel for teams, organizations, and
              institutions. From annual corporate retreats to NGO field visits,
              we bring the same editorial approach — but dialed for
              efficiency, accountability, and scalability.
            </p>
            <span className="engine-card__number" aria-hidden="true">02</span>
          </div>
        </div>
      </div>
    </section>
  );
}
