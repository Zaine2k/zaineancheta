import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#hero" className="navbar__brand">
        ZAINE ANCHETA
      </a>

      <div className="navbar__links">
        <a href="#about">ABOUT</a>
        <a href="#projects">EXPERIENCE</a>
        <a href="#work">PROJECTS</a>
        <a href="#contact">CONTACT</a>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__resume"
        >
          RESUME ↗
        </a>

        <ThemeToggle />
      </div>
    </nav>
  );
}