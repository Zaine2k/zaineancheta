import "./Work.css";

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work__eyebrow">
        <span>SELECTED WORK</span>
        <span>03</span>
      </div>

      <div className="work__intro">
        <h2>
          THINGS I&apos;VE
          <br />
          <em>BUILT.</em>
        </h2>

        <p>
          A selection of technical projects across data science, software,
          machine learning, and creative technology.
        </p>
      </div>

      <div className="work__grid">
        {/* FRACTURING INTELLIGENCE */}
        <article className="work-card work-card--oil">
          <div className="work-card__top">
            <span className="work-card__number">01</span>
            <span className="work-card__type">
              DATA SCIENCE / OIL &amp; GAS
            </span>
          </div>

          <h3>
            NORTH AMERICAN
            <br />
            FRACTURING OPERATIONS
            <br />
            INTELLIGENCE
          </h3>

          <p className="work-card__description">
            Analyzed over 300k+ oil fracturing records to identify
            operational patterns across North America and communicate
            performance insights through data analysis and visualization.
          </p>

          <div className="work-card__details">
            <div>
              <span className="work-card__label">WHAT I DID</span>

              <p>
                K-means clustering, correlation analysis, weighted performance
                scoring, spatial analysis, and dashboard development.
              </p>
            </div>
          </div>

          <div className="work-card__tags">
            <span>Python</span>
            <span>Pandas</span>
            <span>PostgreSQL</span>
            <span>GeoPandas</span>
            <span>Power BI</span>
            <span>K-Means</span>
          </div>
        </article>

        {/* CALGARY HOUSING */}
        <article className="work-card work-card--housing">
          <div className="work-card__top">
            <span className="work-card__number">02</span>
            <span className="work-card__type">
              MACHINE LEARNING / FULL STACK
            </span>
          </div>

          <h3>
            CALGARY PROPERTY
            <br />
            PRICE PREDICTION
            <br />
            PLATFORM
          </h3>

          <p className="work-card__description">
            Built an end-to-end machine learning platform that predicts Calgary
            residential property values using municipal assessment data.
          </p>

          <div className="work-card__details">
            <div>
              <span className="work-card__label">WHAT I DID</span>

              <p>
                Cleaned and transformed assessment data, trained an XGBoost
                regression model, analyzed geographic patterns, and exposed
                predictions through a web application.
              </p>
            </div>
          </div>

          <div className="work-card__tags">
            <span>Python</span>
            <span>XGBoost</span>
            <span>FastAPI</span>
            <span>Next.js</span>
            <span>GeoPandas</span>
          </div>
        </article>

        {/* RESYNTH */}
        <article className="work-card work-card--resynth">
          <div className="work-card__top">
            <span className="work-card__number">03</span>
            <span className="work-card__type">
              AUDIO / MACHINE LEARNING
            </span>
          </div>

          <h3>
            RESYNTH
          </h3>

          <p className="work-card__description">
            An experimental audio analysis system for estimating synthesizer
            parameters from target audio using spectral and temporal feature
            extraction, envelope and oscillator estimation, and hyperparameter
            optimization.
          </p>

          <div className="work-card__details">
            <div>
              <span className="work-card__label">WHAT I DID</span>

              <p>
                Extracted spectral and temporal features, estimated envelope and
                oscillator characteristics, and optimized synthesis parameters
                against target audio.
              </p>
            </div>
          </div>

          <div className="work-card__tags">
            <span>Python</span>
            <span>librosa</span>
            <span>SciPy</span>
            <span>Optuna</span>
            <span>DSP</span>
            <span>Audio Analysis</span>
          </div>
        </article>
      </div>
    </section>
  );
}