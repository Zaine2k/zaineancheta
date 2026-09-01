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
        <a href="#contact">CONTACT</a>
        
      </div>
    </nav>
  );
}