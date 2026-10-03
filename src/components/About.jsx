import React from "react";

function About() {
  return (
    <section
      id="about"
      className="about"
    >
      <div className="about-top">
        <p className="section-label">
          01 / ABOUT
        </p>

        <h2>
          Ideas that move
          <br />
          beyond what
          <br />
          already exists.
        </h2>
      </div>

      <div className="about-bottom">
        <span className="section-small">
          A different perspective.
        </span>

        <div className="about-copy">
          <p>
            We create digital experiences
            that combine design, technology
            and motion into something
            immersive.
          </p>

          <p>
            Every interaction is considered,
            creating an experience that feels
            natural, calm and memorable.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;