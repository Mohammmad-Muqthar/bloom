import React from "react";

function Hero() {
  return (
    <section
      id="home"
      className="hero"
    >
      <div className="hero-content">
        <p className="hero-label">
          BEYOND THE ORDINARY
        </p>

        <h1>
          Shaping
          <br />
          New Perspectives
        </h1>
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-line" />

        Scroll to explore
      </div>
    </section>
  );
}

export default Hero;