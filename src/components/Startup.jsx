import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Startup = ({ onComplete }) => {
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.playbackRate = 0.85;
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }

    gsap.set([logoRef.current, progressRef.current], { opacity: 0 });

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => onComplete && onComplete(),
        });
      },
    });

    timeline.to({}, { duration: 0.3 }).to(
      {},
      {
        duration: 2.5,
        onStart: () => {
          gsap.to(logoRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(progressRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        },
        onUpdate() {
          const prog = this.progress() * 100;
          setProgress(prog);
        },
      }
    );

    return () => timeline.kill();
  }, [onComplete]);

  return (
    <div id="startup" ref={containerRef}>
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/mac-startup.mp3" type="audio/mpeg" />
      </audio>
      <div className="startup-content">
        <div className="logo-container" ref={logoRef}>
          <img
            src="/images/apple-logo.png"
            alt="Apple Logo"
            className="apple-logo"
          />
        </div>
        <div className="progress-container" ref={progressRef}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startup;
