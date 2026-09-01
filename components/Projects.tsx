import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects__eyebrow">
        <span>EXPERIENCE</span>
        <span>02</span>
      </div>

      <article className="project project--blank">
        <p className="project__type">
          AUDIO SOFTWARE / DSP / PRODUCT
        </p>
        <p className="project__type">
          JUN 2026 - PRESENT
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

      <article className="project project--depths">
        <p className="project__type">
          GAME DEVELOPMENT / MUSIC 
        </p>
        <p className="project__type">
          JUN 2025 - PRESENT
        </p>

        <h2>GLASS GECKO GAMES</h2>

        <p className="project__description">
          Associate Programmer &amp; Music Composer working on Scale the
          Depths, contributing gameplay systems, audio implementation, and
          original music.
        </p>

        <div className="project__meta">
          <span>UNITY</span>
          <span>C#</span>
          <span>MUSIC</span>
          <span>AUDIO</span>
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
    </section>
  );
}