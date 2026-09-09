import "./About.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__eyebrow">
        <span>ABOUT</span>
        <span>01</span>
      </div>

      <div className="about__content">
        <h2>
        DATA SCIENCE,
        <br />
        BUILT WITH
        <br />
        <em>CREATIVE INSTINCT.</em>
      </h2>

        <p>
          I&apos;m a third-year Computer Science student at the University of
          Calgary interested in the space between data and creativity. I build
          machine learning models, analyze real-world datasets, develop software,
          and occasionally make computers produce music. I&apos;m drawn to problems
          where technical thinking and creative experimentation can coexist.
        </p>
      </div>

      <div className="about__details">
        {/* EDUCATION */}
        <div className="about__education">
          <div className="about__education-label">
            EDUCATION
          </div>

          <div className="about__education-content">
            <div>
              <h3>UNIVERSITY OF CALGARY</h3>

              <p>
                BSc Computer Science + Minor in Data Science
                <br />
                Faculty of Science Co-op Program
              </p>
            </div>

            <span className="about__education-year">
              2023 — EXPECTED 2028
            </span>
          </div>
        </div>

        {/* SKILLS */}
        <div className="about__skills">
          <div className="about__skills-label">
            SKILLS
          </div>

          <div className="about__skills-grid">
            <div className="about__skills-group">
              <span className="about__skills-category">
                LANGUAGES
              </span>

              <div className="about__skills-items">
                <span>Python</span>
                <span>C++</span>
                <span>C#</span>
                <span>TypeScript</span>
                <span>JavaScript</span>
                <span>SQL</span>
                <span>Java</span>
                <span>R</span>
              </div>
            </div>

            <div className="about__skills-group">
              <span className="about__skills-category">
                WEB
              </span>

              <div className="about__skills-items">
                <span>React</span>
                <span>Next.js</span>
                <span>FastAPI</span>
                <span>HTML</span>
                <span>CSS</span>
                <span>REST APIs</span>
                <span>Supabase</span>
              </div>
            </div>

            <div className="about__skills-group">
              <span className="about__skills-category">
                DATA / ML
              </span>

              <div className="about__skills-items">
                <span>Pandas</span>
                <span>NumPy</span>
                <span>scikit-learn</span>
                <span>XGBoost</span>
                <span>Power BI</span>
                <span>TensorFlow</span>
              </div>
            </div>

            <div className="about__skills-group">
              <span className="about__skills-category">
                AUDIO
              </span>

              <div className="about__skills-items">
                <span>JUCE + HISE</span>
                <span>DSP</span>
                <span>FL Studio</span>
                <span>Audio Mixing/Mastering</span>
              </div>
            </div>

            <div className="about__skills-group">
              <span className="about__skills-category">
                INTERACTIVE
              </span>

              <div className="about__skills-items">
                <span>Unity</span>
                <span>Three.js</span>
                <span>React Three Fiber</span>
                <span>Real-Time Systems</span>
              </div>
            </div>

            <div className="about__skills-group">
              <span className="about__skills-category">
                TOOLS
              </span>

              <div className="about__skills-items">
                <span>Git</span>
                <span>GitHub</span>
                <span>CMake</span>
                <span>Visual Studio</span>
                <span>VS Code</span>
                <span>PostgreSQL</span>
                <span>Claude + Codex</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}