import { useState, useEffect } from "react";

const ROLES = [
  "Developer",
  "Creative Thinker",
  "Problem Solver",
  "CS Student",
  "Full-Stack Developer", 
  "Data Enthusiast",
  "Cloud Explorer", 
  "Lifelong Learner",
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typing effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  const displayText = ROLES[roleIndex].slice(0, charIndex);

  return (
    <div
      id="home"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Nebula glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,80,180,0.12) 0%, rgba(60,100,200,0.06) 40%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <h1
        style={{
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          fontWeight: 700,
          background: "linear-gradient(135deg, #c0d9ff, #d8b4fe, #93c5fd)",
          backgroundSize: "200% 200%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientShift 6s ease infinite",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
          margin: "0 0 16px",
          letterSpacing: "-1.5px",
          lineHeight: 1.1,
        }}
      >
        Tatiana Lopez
      </h1>

      {/* Typing effect subtitle */}
      <div
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          color: "#8a92b8",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.5s ease 0.3s, transform 1.5s ease 0.3s",
          fontWeight: 400,
          letterSpacing: "1px",
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <span style={{ color: "#6e7494" }}>I'm a </span>
        <span
          style={{
            color: "#b4c8ff",
            marginLeft: 8,
            fontWeight: 600,
            minWidth: 180,
            textAlign: "left",
          }}
        >
          {displayText}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1.2em",
              background: "#b4c8ff",
              marginLeft: 2,
              verticalAlign: "text-bottom",
              animation: "blink 1s step-end infinite",
            }}
          />
        </span>
      </div>

      {/* CTA button */}
      <a
        href="#about"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.8s ease 0.6s, transform 1.8s ease 0.6s",
          padding: "12px 32px",
          borderRadius: 30,
          background: "rgba(168, 198, 255, 0.1)",
          border: "1px solid rgba(168, 198, 255, 0.25)",
          color: "#b4c8ff",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.9rem",
          letterSpacing: "0.5px",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(168, 198, 255, 0.18)";
          e.target.style.boxShadow = "0 0 30px rgba(168,198,255,0.15)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(168, 198, 255, 0.1)";
          e.target.style.boxShadow = "none";
        }}
      >
        Get to Know Me
      </a>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          opacity: loaded ? 0.4 : 0,
          transition: "opacity 2s ease 1.5s",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8a92b8"
          strokeWidth="2"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}
