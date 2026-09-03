import "./Projects.css";
import ExperienceScene from "./three/ExperienceScene";

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <ExperienceScene />

      <div className="projects__eyebrow">
        <span>EXPERIENCE</span>
        <span>02</span>
      </div>

      <h2 className="projects__title">EXPERIENCE</h2>

      <div className="projects__intro">
        <span className="projects__intro-label">CAREER DIRECTION</span>

        <h3>Data science, informed by software and interactive systems.</h3>

        <p>
          Data science is the foundation of my career, strengthened by experience
          across software development, audio, and interactive media. Across each
          role, I&apos;ve learned to translate complex ideas into practical
          systems, communicate across disciplines, and build technology with the
          people using it in mind.
        </p>
      </div>

      <div className="projects__stack">
        {/* BLANK AUDIO */}
        <article className="project project--blank">
          <div className="project__header">
            <p className="project__type project__role">
              FOUNDER &amp; SOFTWARE DEVELOPER
            </p>
            <p className="project__type project__date">AUG 2026 — PRESENT</p>
          </div>

          <h2>blank audio</h2>

          <p className="project__description">
            Founded an independent audio-software company focused on accessible
            plugins, expressive DSP tools, and minimal product design.
          </p>

          <ul className="project__highlights">
            <li>
              Designed and shipped CORE Echo, a Windows VST3 delay and reverb
              plugin featuring 17 factory presets and tempo-synced delay modes.
            </li>
            <li>
              Built the product website and distribution workflow using React,
              Supabase, Stripe, and a custom Windows installer.
            </li>
            <li>
              Expanded the project into a four-person team and established weekly
              development cycles across DSP, software, and product design.
            </li>
          </ul>

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
            aria-label="Visit the Blank Audio website"
          >
            <img
              src="/images/blankaudiothumb.png"
              alt="Blank Audio website preview"
            />

            <div className="project__embed-info">
              <span className="project__embed-domain">blankaudio.dev</span>
              <span className="project__embed-title">Visit Blank Audio ↗</span>
            </div>
          </a>
        </article>

        {/* GLASS GECKO GAMES */}
        <article className="project project--depths">
          <div className="project__header">
            <p className="project__type project__role">
              ASSOCIATE PROGRAMMER / MUSIC COMPOSER
            </p>
            <p className="project__type project__date">AUG 2025 — PRESENT</p>
          </div>

          <h2>GLASS GECKO GAMES</h2>

          <p className="project__description">
            Contributing programming and original music to Scale the Depths, a
            commercially released indie game that surpassed 100,000 copies sold.
          </p>

          <ul className="project__highlights">
            <li>
              Implemented and tested event-driven audio behaviour using Unity and
              C#, connecting music and sound to gameplay events.
            </li>
            <li>
              Debugged audio and gameplay interactions across production builds,
              improving consistency during active development.
            </li>
            <li>
              Composed original soundtrack material and shaped musical transitions
              around the game&apos;s pacing and underwater atmosphere.
            </li>
          </ul>

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
            aria-label="View Scale the Depths on Steam"
          >
            <img
              src="/images/scalethedepthsthumb.png"
              alt="Scale the Depths Steam preview"
            />

            <div className="project__embed-info">
              <span className="project__embed-domain">SCALE THE DEPTHS</span>
              <span className="project__embed-title">View on Steam ↗</span>
            </div>
          </a>
        </article>

        {/* DATA SCIENCE & MACHINE LEARNING CLUB */}
        <article className="project project--dsmlc">
          <div className="project__header">
            <p className="project__type project__role">COMPETITION DIRECTOR</p>
            <p className="project__type project__date">APR 2025 — PRESENT</p>
          </div>

          <h2>
            DATA SCIENCE &amp;
            <br />
            MACHINE LEARNING CLUB
          </h2>

          <p className="project__description">
            Directing the competition program for the University of Calgary&apos;s
            largest data science club and translating industry problems into
            approachable technical challenges for students.
          </p>

          <ul className="project__highlights">
            <li>
              Lead end-to-end competition planning, including challenge design,
              dataset review, rules, participant resources, and event delivery.
            </li>
            <li>
              Coordinate with industry partners and judges to align evaluation
              criteria with practical data science and communication skills.
            </li>
            <li>
              Advanced into competition leadership after earning 1st place in the
              Beginner Category of the club&apos;s 2025 data science competition.
            </li>
          </ul>

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
