import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function VideoScroll() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();
    video.currentTime = 0.01;

    setDuration(video.duration);
  };

  const handleLoadedData = () => {
    setVideoReady(true);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      const content = contentRef.current;

      if (!section || !video || !duration) return;

      video.pause();

      const finalTime = Math.max(duration - 0.05, 0);

      let targetTime = 0;
      let isSeeking = false;

      /*
        ==========================================
        VIDEO SEEK FUNCTION
        ==========================================
      */

      const seekVideo = () => {
        if (!video) return;

        if (isSeeking) return;

        const difference = Math.abs(
          video.currentTime - targetTime
        );

        /*
          Ignore tiny corrections.

          This is important because those tiny
          currentTime changes are what usually
          create the shake after scrolling stops.
        */
        if (difference < 0.04) {
          return;
        }

        isSeeking = true;

        video.currentTime = targetTime;
      };

      /*
        When browser finishes seeking,
        only seek again if scroll position
        has actually changed enough.
      */

      const handleSeeked = () => {
        isSeeking = false;

        const difference = Math.abs(
          video.currentTime - targetTime
        );

        if (difference > 0.04) {
          seekVideo();
        }
      };

      video.addEventListener(
        "seeked",
        handleSeeked
      );

      /*
        ==========================================
        FIXED VIDEO SCALE
        ==========================================
      */

      gsap.set(video, {
        scale: 1.02,
        transformOrigin: "center center",
        force3D: true,
      });

      /*
        ==========================================
        CONTENT START STATE
        ==========================================
      */

      if (content) {
        gsap.set(content, {
          y: 0,
          opacity: 1,
        });
      }

      /*
        ==========================================
        MAIN VIDEO SCROLL TRIGGER
        ==========================================
      */

      const videoTrigger = ScrollTrigger.create({
        trigger: section,

        start: "top top",

        /*
          Longer scroll experience
        */
        end: "+=1600%",

        pin: true,

        /*
          IMPORTANT:
          Do not use scrub: 1.5 here.

          Lenis already smooths scrolling.
          true keeps ScrollTrigger directly
          synced to Lenis without a second
          catch-up animation.
        */
        scrub: true,

        anticipatePin: 1,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          targetTime =
            self.progress *
            finalTime;

          seekVideo();
        },
      });

      /*
        ==========================================
        OPTIONAL TEXT PARALLAX
        ==========================================
      */

      let textTween;

      if (content) {
        textTween = gsap.to(content, {
          y: -160,
          opacity: 0,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: "+=1300%",

            /*
              Same thing here:
              no numeric scrub delay.
            */
            scrub: true,
          },
        });
      }

      /*
        ==========================================
        REFRESH
        ==========================================
      */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      /*
        ==========================================
        CLEANUP
        ==========================================
      */

      return () => {
        video.removeEventListener(
          "seeked",
          handleSeeked
        );

        videoTrigger.kill();

        if (textTween) {
          textTween.kill();
        }

        video.pause();
      };
    },
    {
      scope: sectionRef,
      dependencies: [duration],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="video-hero"
    >
      <video
        ref={videoRef}
        className={`hero-video ${
          videoReady ? "video-ready" : ""
        }`}
        src="/mountain-hero-scroll.mp4"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedMetadata={handleLoadedMetadata}
        onLoadedData={handleLoadedData}
      />

      <div className="hero-overlay" />

      <div
        ref={contentRef}
        className="hero-content"
      >
        <p className="hero-small-title">
          INTO THE UNKNOWN
        </p>

        <h1 className="hero-title">
          Explore
          <br />
          the Heights
        </h1>

        <p className="hero-description">
          Move through silence, mist and mountains.
        </p>
      </div>

      <div className="scroll-text">
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}

export default VideoScroll;