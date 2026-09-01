import "./Awards.css";

export default function Awards() {
  return (
    <section id="awards" className="awards">
      <div className="awards__eyebrow">
        <span>AWARDS</span>
        <span>04</span>
      </div>

      <div className="awards__intro">
        <h2>
          A FEW GOOD
          <br />
          <em>THINGS.</em>
        </h2>

        <p>
          Awards, academic recognition and competition results from my work across
          computer science and data science.
        </p>
      </div>

      <div className="awards__grid">
        {/* DEAN'S LIST */}
        <article className="award-card award-card--deans">
          <div className="award-card__top">
            <span>01</span>
            <span>2025 — 2026</span>
          </div>

          <span className="award-card__category">
            ACADEMIC
          </span>

          <h3>
            FACULTY OF SCIENCE
            <br />
            DEAN&apos;S LIST 2025/2026
          </h3>

          <p>
            Recognized by the University of Calgary Faculty of Science for
            outstanding academic achievement. 
          </p>

          <div className="award-card__footer">
            UNIVERSITY OF CALGARY
          </div>
        </article>

        {/* DSMLC WIN */}
        <article className="award-card award-card--dsmlc">
          <div className="award-card__top">
            <span>02</span>
            <span>MAR 2025</span>
          </div>

          <span className="award-card__category">
            1ST PLACE
          </span>

          <h3>
            DSMLC FINAL
            <br />
            COMPETITION 2025
          </h3>

          <p>
            Analyzed Canadian small-business loan and claims data using Python,
            R, and Power BI, then presented the findings to industry
            professionals, and students.
          </p>

          <div className="award-card__footer">
            DATA SCIENCE &amp; MACHINE LEARNING CLUB
          </div>
        </article>
      </div>
    </section>
  );
}