import React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";

import GlobalVideoBackground from "./components/GlobalVideoBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
// import Footer from "./components/Footer";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function LenisSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  return null;
}

function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      }}
    >
      <LenisSync />

      <div className="site">
        <GlobalVideoBackground />

        <Navbar />

        {/* VIDEO EXPERIENCE */}
        <main className="video-journey">
          <Hero />
          <About />
          <Projects />
        </main>

        {/* BLACK FOOTER SLIDES OVER VIDEO */}
        {/* <Footer /> */}
      </div>
    </ReactLenis>
  );
}

export default App;