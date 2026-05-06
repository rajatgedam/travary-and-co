import './OurStorySection.css';

export default function OurStorySection() {
  return (
    <section className="our-story section" aria-label="Our story">
      <div className="container our-story__inner">
        <div>
          <p className="our-story__eyebrow">Our Manifesto</p>
          <h2 className="our-story__title">
            Built on Dirt Roads and&nbsp;Deadlines.
          </h2>
        </div>
        <div className="our-story__body">
          <p>
            Journey &amp; Co. didn't start in a boardroom. It started with a
            broken-down van in southern Morocco, a group of twelve people who
            didn't know each other, and a shared decision to make the best of
            it. That trip became the blueprint.
          </p>

          <div className="our-story__pull-quote">
            <p>
              "The difference between a good trip and a great one is almost
              always invisible — it's the work done before anyone boards a
              plane."
            </p>
          </div>

          <p>
            We built the company around one belief: that remarkable travel
            requires rigorous preparation. We obsess over logistics so our
            travelers never have to. Every permit, every transfer, every
            backup plan — thought through in advance, so the only surprises
            are the good kind.
          </p>

          <p>
            Six years and eighteen countries later, that same philosophy drives
            everything we do — for individual explorers and the organizations
            that trust us with their teams.
          </p>
        </div>
      </div>
    </section>
  );
}
