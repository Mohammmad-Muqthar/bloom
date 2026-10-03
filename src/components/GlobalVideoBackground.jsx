import React, {
  useRef,
  useState,
} from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

function GlobalVideoBackground() {
  const videoRef = useRef(null);

  const [duration, setDuration] =
    useState(0);

  const [videoReady, setVideoReady] =
    useState(false);

  /* =========================================
     VIDEO LOAD
  ========================================= */

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) return;

    video.pause();

    /*
      Small offset so the first frame
      decodes properly.
    */
    video.currentTime = 0.01;

    setDuration(video.duration);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  };

  const handleLoadedData = () => {
    setVideoReady(true);
  };

  /* =========================================
     VIDEO SCROLL CONTROL
  ========================================= */

  useGSAP(
    () => {
      const video =
        videoRef.current;

      const journey =
        document.querySelector(
          ".video-journey"
        );

      if (
        !video ||
        !journey ||
        !duration
      ) {
        return;
      }

      video.pause();

      /*
        Avoid the absolute last millisecond.
      */
      const finalTime =
        Math.max(
          duration - 0.05,
          0
        );

      let targetTime = 0;
      let isSeeking = false;

      /*
        Small threshold gives quick response
        while avoiding micro-jitter.
      */
      const SEEK_THRESHOLD =
        0.015;

      /* =====================================
         SEEK VIDEO
      ===================================== */

      const seekVideo = () => {
        if (!video) return;

        if (isSeeking) return;

        const difference =
          Math.abs(
            video.currentTime -
              targetTime
          );

        if (
          difference <
          SEEK_THRESHOLD
        ) {
          return;
        }

        isSeeking = true;

        video.currentTime =
          targetTime;
      };

      /* =====================================
         SEEK COMPLETE
      ===================================== */

      const handleSeeked = () => {
        isSeeking = false;

        const difference =
          Math.abs(
            video.currentTime -
              targetTime
          );

        if (
          difference >
          SEEK_THRESHOLD
        ) {
          seekVideo();
        }
      };

      video.addEventListener(
        "seeked",
        handleSeeked
      );

      /* =====================================
         SCROLLTRIGGER

         IMPORTANT:

         Only .video-journey controls video.

         Hero
         ↓
         About
         ↓
         Projects
         ↓
         VIDEO FINISHES

         Footer does NOT affect video.
      ===================================== */

      const trigger =
        ScrollTrigger.create({
          trigger: journey,

          start: "top top",

          /*
            Video reaches final frame exactly
            when Projects reaches its final
            viewport position.
          */
          end: "bottom bottom",

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progress =
              Math.max(
                0,
                Math.min(
                  self.progress,
                  1
                )
              );

            targetTime =
              progress *
              finalTime;

            seekVideo();
          },

          onRefresh: (self) => {
            const progress =
              Math.max(
                0,
                Math.min(
                  self.progress,
                  1
                )
              );

            targetTime =
              progress *
              finalTime;

            seekVideo();
          },
        });

      /* =====================================
         INITIAL POSITION
      ===================================== */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        /*
          Makes sure the correct video frame
          appears if browser restores scroll
          position after refresh.
        */
        const triggerStart =
          trigger.start;

        const triggerEnd =
          trigger.end;

        const currentScroll =
          window.scrollY;

        const distance =
          triggerEnd -
          triggerStart;

        if (distance > 0) {
          const progress =
            Math.max(
              0,
              Math.min(
                (
                  currentScroll -
                  triggerStart
                ) /
                  distance,
                1
              )
            );

          targetTime =
            progress *
            finalTime;

          seekVideo();
        }
      });

      /* =====================================
         RESIZE
      ===================================== */

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener(
        "resize",
        handleResize
      );

      /* =====================================
         CLEANUP
      ===================================== */

      return () => {
        video.removeEventListener(
          "seeked",
          handleSeeked
        );

        window.removeEventListener(
          "resize",
          handleResize
        );

        trigger.kill();

        video.pause();
      };
    },
    {
      dependencies: [duration],
      revertOnUpdate: true,
    }
  );

  return (
    <div className="global-video-background">

      <video
        ref={videoRef}
        className={`global-bg-video ${
          videoReady
            ? "video-ready"
            : ""
        }`}
        src="/mountain-hero-scroll.mp4"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onLoadedMetadata={
          handleLoadedMetadata
        }
        onLoadedData={
          handleLoadedData
        }
      />

      {/* Fog keeps moving even after video stops */}

      <div className="global-fog fog-a" />

      <div className="global-fog fog-b" />

      <div className="global-fog fog-c" />

    </div>
  );
}

export default GlobalVideoBackground;