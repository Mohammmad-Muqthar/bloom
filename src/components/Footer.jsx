import React, { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const revealRef = useRef(null);
  const footerRef = useRef(null);
  const innerRef = useRef(null);

  useGSAP(
    () => {
      const reveal = revealRef.current;
      const footer = footerRef.current;
      const inner = innerRef.current;

      if (!reveal || !footer) return;

      /*
        Footer begins completely below viewport.
      */
      gsap.set(footer, {
        yPercent: 100,
      });

      /*
        Slight inner movement makes the
        reveal feel more premium.
      */
      gsap.set(inner, {
        y: 60,
        opacity: 0.75,
      });

      /*
        MAIN FOOTER SLIDE

        Because .footer-reveal is very tall,
        100% -> 0% movement takes a long
        scroll distance.

        This makes the footer slide slowly.
      */
      const footerTween = gsap.to(
        footer,
        {
          yPercent: 0,

          ease: "none",

          scrollTrigger: {
            trigger: reveal,

            /*
              Begin when reveal area reaches
              bottom of viewport.
            */
            start: "top bottom",

            /*
              Finish only near the very
              bottom of reveal area.
            */
            end: "bottom bottom",

            scrub: true,

            invalidateOnRefresh: true,
          },
        }
      );

      /*
        Inner content settles gently
        while footer comes upward.
      */
      const innerTween = gsap.to(
        inner,
        {
          y: 0,

          opacity: 1,

          ease: "none",

          scrollTrigger: {
            trigger: reveal,

            start: "top 80%",

            end: "center center",

            scrub: true,

            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        footerTween.kill();
        innerTween.kill();
      };
    },
    {
      scope: revealRef,
    }
  );

  return (
    <section
      ref={revealRef}
      className="footer-reveal"
    >
      <footer
        ref={footerRef}
        id="contact"
        className="footer"
      >
        <div
          ref={innerRef}
          className="footer-inner"
        >
          <div className="footer-top">
            <p className="footer-label">
              LET'S CREATE SOMETHING
            </p>

            <h2>
              Have an idea?
              <br />
              Let's make it
              <br />
              happen.
            </h2>
          </div>

          <div className="footer-middle">
            <a
              href="mailto:hello@bloom.com"
              className="footer-email"
            >
              hello@bloom.com
            </a>
          </div>

          <div className="footer-bottom">
            <div className="footer-brand">
              BLOOM
            </div>

            <div className="footer-links">
              <a href="#home">
                Home
              </a>

              <a href="#about">
                About
              </a>

              <a href="#projects">
                Projects
              </a>
            </div>

            <div className="footer-copy">
              © 2026 BLOOM
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Footer;