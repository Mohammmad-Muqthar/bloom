import React from "react";

function Navbar() {
  return (
    <header className="navbar">
      <a
        href="#home"
        className="navbar-logo"
      >
        BLOOM
      </a>

      <nav className="navbar-links">
        <a href="#home">
          Home
        </a>

        <a href="#about">
          About
        </a>

        <a href="#projects">
          Projects
        </a>

        <a href="#contact">
          Contact
        </a>
                <a href="#contact">
          Contact
        </a>
      </nav>

      <button
        className="menu-button"
        aria-label="Open navigation"
      >
        <span />
        <span />
      </button>
    </header>
  );
}

export default Navbar;