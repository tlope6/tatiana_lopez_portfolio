

import { useState, useEffect } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import profile from "../assets/githubpic.png";
const headshot = profile;

function Counter({ target, label, suffix, delay }) {
  const [ref, vis] = useRevealOnScroll(0.1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!vis) return;
    let cur = 0;
    const steps = 30;
    const inc = target / steps;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 40);
    return () => clearInterval(t);
  }, [vis, target]);

  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transition: `all 0.6s ease ${delay}s` }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#c88aff" }}>
        {count}{suffix}
      </div>
      <div style={{ color: "#6a5a88", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}

function PhilosophyCard({ title, text, delay }) {
  const [ref, vis] = useRevealOnScroll(0.1);
  const [h, setH] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? "rgba(200,138,255,0.08)" : "rgba(200,138,255,0.04)",
        border: h
          ? "1px solid rgba(200,138,255,0.2)"
          : "1px solid rgba(200,138,255,0.08)",
        borderRadius: 14,
        padding: "18px 20px",
        transition: "all 0.4s ease",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(30px)",
        transitionDelay: `${delay}s`,
      }}
    >
      <h4 style={{ fontFamily: "'Syne', sans-serif", color: "#c88aff", fontSize: "0.9rem", fontWeight: 700, marginBottom: 6 }}>
        {title}
      </h4>
      <p style={{ color: "#8a7aaa", fontSize: "0.82rem", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

export default function About() {
  const [ref, vis] = useRevealOnScroll(0.1);

  return (
    <section id="about" style={{ padding: "100px 20px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <p style={{ color: "#6a5a88", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 8 }}>
        GET TO KNOW ME
      </p>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, marginBottom: 40 }}>
        <span style={{ color: "#f0e8ff" }}>✦ About </span>
        <span style={{ color: "#c88aff" }}>Me</span>
        <span style={{ color: "#f0e8ff" }}> ✦</span>
      </h2>

      <div
        ref={ref}
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s ease",
        }}
      >
        {/* Left bio */}
        <div style={{ flex: "1 1 280px", maxWidth: 360 }}>
          <p style={{ color: "#b0a0cc", lineHeight: 1.8, fontSize: "0.92rem", marginBottom: 20 }}>
            I am a passionate developer with a love for creating beautiful and
            functional applications. I enjoy turning ideas into reality through
            code and design.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
            <Counter target={3} label="Projects Built" suffix="+" delay={0} />
            <Counter target={11} label="Technologies" suffix="" delay={0.1} />
            <Counter target={3} label="Languages" suffix="+" delay={0.2} />
            <Counter target={100} label="Dedication" suffix="%" delay={0.3} />
          </div>
        </div>

        {/* Center — headshot */}
        <div
          style={{
            flex: "0 0 auto",
            width: 240,
            height: 300,
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            border: "2px solid rgba(200,138,255,0.15)",
            boxShadow: "0 0 50px rgba(200,138,255,0.1)",
            background: headshot
              ? "transparent"
              : "linear-gradient(135deg, rgba(200,138,255,0.1), rgba(120,80,200,0.1))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {headshot ? (
            <img src={headshot} alt="Tatiana Lopez" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: "4rem", opacity: 0.4 }}>👩‍💻</span>
          )}
        </div>

        {/* Right — philosophy cards */}
        <div style={{ flex: "1 1 260px", maxWidth: 320, display: "flex", flexDirection: "column", gap: 16 }}>
          <PhilosophyCard title="My Philosophy" text="Blending creativity with technical skill to build solutions that are both elegant and functional." delay={0} />
          <PhilosophyCard title="The Mission" text="Transforming complex ideas into clean, intuitive experiences that solve real problems." delay={0.15} />
        </div>
      </div>
    </section>
  );
}