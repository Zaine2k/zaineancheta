import "./Work.css";

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work__eyebrow">
        <span>SELECTED WORK</span>
        <span>03</span>
      </div>

      <div className="work__intro">
        <div>
          <h2>
            THINGS I&apos;VE
            <br />
            <em>BUILT.</em>
          </h2>

          <a
            href="https://github.com/Zaine2k"
            target="_blank"
            rel="noopener noreferrer"
            className="work__github"
            aria-label="View Zaine Ancheta's GitHub profile"
          >
            <span>VIEW GITHUB</span>
          </a>
        </div>

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
            Analyzed over 300k oil fracturing records to identify operational
            patterns across North America and communicate performance insights
            through data analysis and visualization.
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

        {/* DSMLC FINAL COMPETITION */}
        <article className="work-card work-card--dsmlc">
          <div className="work-card__top">
            <span className="work-card__number">03</span>
            <span className="work-card__type">
              DATA SCIENCE / 1ST PLACE
            </span>
          </div>

          <h3>
            CANADIAN SMALL
            <br />
            BUSINESS GROWTH
            <br />
            ANALYSIS
          </h3>

          <p className="work-card__description">
            Won 1st Place at the 2025 DSMLC Final Competition by analyzing
            Canadian small-business loan and claims data to uncover financing,
            growth, and business performance trends.
          </p>

          <div className="work-card__details">
            <div>
              <span className="work-card__label">WHAT I DID</span>

              <p>
                Explored loan and claims datasets, identified meaningful
                business growth patterns, developed data visualizations, and
                presented evidence-based findings to judges and industry
                professionals.
              </p>
            </div>
          </div>

          <div className="work-card__tags">
            <span>Python</span>
            <span>R</span>
            <span>Power BI</span>
            <span>Data Analysis</span>
            <span>Visualization</span>
          </div>
        </article>

        {/* RESYNTH */}
        <article className="work-card work-card--resynth">
          <div className="work-card__top">
            <span className="work-card__number">04</span>
            <span className="work-card__type">
              AUDIO / MACHINE LEARNING
            </span>
          </div>

          <h3>RESYNTH</h3>

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

        {/* SIMPLE GAIN */}
        <article className="work-card work-card--simplegain">
          <div className="work-card__top">
            <span className="work-card__number">05</span>
            <span className="work-card__type">
              AUDIO SOFTWARE / C++
            </span>
          </div>

          <h3>
            SIMPLE
            <br />
            GAIN
          </h3>

          <p className="work-card__description">
            Built a native VST3 audio plugin in C++ as a focused exploration of
            real-time audio processing, plugin architecture, parameter
            management, and JUCE development.
          </p>

          <div className="work-card__details">
            <div>
              <span className="work-card__label">WHAT I DID</span>

              <p>
                Implemented real-time gain processing, parameter state
                management, plugin initialization, and a custom interface while
                building and testing the VST3 inside a DAW.
              </p>
            </div>
          </div>

          <div className="work-card__tags">
            <span>C++</span>
            <span>JUCE</span>
            <span>VST3</span>
            <span>DSP</span>
            <span>CMake</span>
          </div>
        </article>

        {/* CODEJUMBLR */}
        <article className="work-card work-card--codejumblr">
          <div className="work-card__top">
            <span className="work-card__number">06</span>
            <span className="work-card__type">
              WEB DEVELOPMENT / CRYPTOGRAPHY
            </span>
          </div>

          <h3>
            CODE
            <br />
            JUMBLR
          </h3>

          <p className="work-card__description">
            Built a lightweight cryptography website for simple Caesar cipher
            encryption, decryption, and text-modification tools.
          </p>

          <div className="work-card__details">
            <div>
              <span className="work-card__label">WHAT I DID</span>

              <p>
                Implemented a web application with a simple user interface for
                encrypting and decrypting text using the Caesar cipher, along
                with additional text-modification features. Built the encryption
                logic in JavaScript and styled the application using HTML and
                CSS.
              </p>
            </div>
          </div>

          <div className="work-card__tags">
            <span>JavaScript</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>Web Development</span>
          </div>
        </article>
      </div>
    </section>
  );
}