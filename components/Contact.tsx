import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__eyebrow">
        <span>CONTACT</span>
        <span>03</span>
      </div>

      <div className="contact__content">
        <p className="contact__small">HEY, YOU MADE IT THIS FAR.</p>

        <h2>
          WANNA MAKE
          <br />
          <em>SOMETHING?</em>
        </h2>

        <p className="contact__description">
          I&apos;m always down to talk about software, data, music,
          creative tech, or whatever weird idea you&apos;re working on.
        </p>

        <div className="contact__links">
          <a
            href="https://www.linkedin.com/in/zaine-ancheta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN ↗
          </a>

          <a href="mailto:zaineancheta123@gmail.com">
            EMAIL ↗
          </a>

          <a
            href="https://github.com/Zaine2k"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB ↗
          </a>
        </div>
      </div>
    </section>
  );
}