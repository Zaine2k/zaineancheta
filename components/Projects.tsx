import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects__eyebrow">
        <span>EXPERIENCE</span>
        <span>02</span>
      </div>

      <div className="projects__stack">
        {/* BLANK AUDIO */}
        <article className="project project--blank">
          <p className="project__type">
            FOUNDER &amp; SOFTWARE DEVELOPER
          </p>

          <p className="project__type">
            AUG 2026 - PRESENT
          </p>

          <h2>blank audio</h2>

          <p className="project__description">
            Building audio plugins, DSP tools, and creative software with a
            focus on minimal interfaces and expressive sound design.
          </p>

          <div className="project__meta">
            <span>JUCE</span>
            <span>HISE</span>
            <span>C++</span>
            <span>DSP</span>
          </div>

          <a
            href="https://blankaudio.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="project__embed"
          >
            <img
              src="/images/blankaudiothumb.png"
              alt="Blank Audio website preview"
            />

            <div className="project__embed-info">
              <span className="project__embed-domain">
                blankaudio.dev
              </span>

              <span className="project__embed-title">
                Visit Blank Audio ↗
              </span>
            </div>
          </a>
        </article>

        {/* GLASS GECKO GAMES */}
        <article className="project project--depths">
          <p className="project__type">
            ASSOCIATE PROGRAMMER / MUSIC COMPOSER
          </p>

          <p className="project__type">
            AUG 2025 - PRESENT
          </p>

          <h2>GLASS GECKO GAMES</h2>

          <p className="project__description">
            Contributing to Scale the Depths through Unity development,
            interactive audio implementation, debugging, and original
            composition.
          </p>

          <div className="project__meta">
            <span>UNITY</span>
            <span>C#</span>
            <span>AUDIO SYSTEMS</span>
            <span>COMPOSITION</span>
          </div>

          <a
            href="https://store.steampowered.com/app/3198890/Scale_the_Depths/"
            target="_blank"
            rel="noopener noreferrer"
            className="project__embed"
          >
            <img
              src="/images/scalethedepthsthumb.png"
              alt="Scale the Depths Steam preview"
            />

            <div className="project__embed-info">
              <span className="project__embed-domain">
                SCALE THE DEPTHS
              </span>

              <span className="project__embed-title">
                View on Steam ↗
              </span>
            </div>
          </a>
        </article>

        {/* DATA SCIENCE & MACHINE LEARNING CLUB */}
        <article className="project project--dsmlc">
          <p className="project__type">
            COMPETITION DIRECTOR
          </p>

          <p className="project__type">
            APR 2025 - PRESENT
          </p>

          <h2>
            DATA SCIENCE &amp;
            <br />
            MACHINE LEARNING CLUB
          </h2>

          <p className="project__description">
            Leading the planning and execution of data science and machine
            learning competitions at the University of Calgary, working with
            industry partners to develop challenges, coordinate judging, and
            create technical experiences for students.
          </p>

          <div className="project__meta">
            <span>DATA SCIENCE</span>
            <span>MACHINE LEARNING</span>
            <span>PYTHON</span>
            <span>POWER BI</span>
            <span>LEADERSHIP</span>
            <span>EVENT COORDINATION</span>
          </div>
        </article>
      </div>
    </section>
  );
}