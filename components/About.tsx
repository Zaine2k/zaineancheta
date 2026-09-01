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
          I BUILD THINGS
          <br />
          BETWEEN <em>CODE</em>,
          <br />
          SOUND, DATA
          <br />
          &amp; CULTURE.
        </h2>

        <p>
          I&apos;m a third-year computer scientist at the University of Calgary. My work moves between web development, 
          data science, audio programming, and interactive media. 
          I&apos;m interested in the intersection of technology and culture, and how we can use code to create meaningful experiences.
        </p>
      </div>

      <div className="about__meta">
        <span>SOFTWARE</span>
        <span>DATA</span>
        <span>AUDIO</span>
      </div>
    </section>
  );
}