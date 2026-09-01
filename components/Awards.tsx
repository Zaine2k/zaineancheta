import "./Awards.css";
import AwardTrophyScene from "./three/AwardScene";

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
          Awards, academic recognition and competition results from my work
          across computer science and data science.
        </p>
      </div>

      <div className="awards__display">
        {/* =====================================
            AWARD 01
        ====================================== */}

        <article className="award-panel award-panel--left">
          <div className="award-panel__top">
            <span>01</span>
            <span>2025 — 2026</span>
          </div>

          <span className="award-panel__category">
            ACADEMIC
          </span>

          <h3>
            FACULTY OF
            <br />
            SCIENCE
          </h3>

          <p>
            Named to the University of Calgary Faculty of Science Dean&apos;s
            List for outstanding academic achievement.
          </p>

          <div className="award-panel__footer">
            UNIVERSITY OF CALGARY
          </div>
        </article>

        {/* =====================================
            CENTER TROPHY
        ====================================== */}

        <div className="awards__center">
          <div className="awards__center-meta">
            <span>RECOGNITION</span>
            <span>HONORS</span>
          </div>

          <div className="awards__trophy">
            <AwardTrophyScene />
          </div>

          <div className="awards__center-caption">
            <span>SELECTED</span>
            <span>AWARDS</span>
          </div>
        </div>

        {/* =====================================
            AWARD 02
        ====================================== */}

        <article className="award-panel award-panel--right">
          <div className="award-panel__top">
            <span>02</span>
            <span>MAR 2025</span>
          </div>

          <span className="award-panel__category">
            1ST PLACE
          </span>

          <h3>
            DSMLC FINAL
            <br />
            COMPETITION
          </h3>

          <p>
            Analyzed Canadian small-business loan and claims data using Python,
            R, and Power BI, then presented the findings to industry
            professionals and students.
          </p>

          <div className="award-panel__footer">
            DATA SCIENCE &amp; MACHINE LEARNING CLUB
          </div>
        </article>
      </div>
    </section>
  );
}