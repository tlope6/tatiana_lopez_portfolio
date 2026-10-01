import { useState } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { SKILLS } from "../data/skills";

const COLORS = [
  "#c88aff", "#a78bfa", "#d8b4fe", "#b694f8", "#e0aaff",
  "#c88aff", "#a78bfa", "#d8b4fe", "#b694f8", "#e0aaff",
];

function SkillBar({ name, level, color, delay }) {
  const [ref, vis] = useRevealOnScroll(0.1);
  const [h, setH] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        marginBottom: 16,
        padding: "6px 10px",
        borderRadius: 8,
        background: h ? "rgba(200,138,255,0.04)" : "transparent",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.5s ease ${delay * 0.07}s`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: h ? "#e0d0ff" : "#c0b0e0", fontSize: "0.88rem", fontWeight: 600, transition: "color 0.3s" }}>
          {name}
        </span>
        <span style={{ color: h ? color : "#5a4f80", fontSize: "0.78rem", fontWeight: 600, transition: "color 0.3s" }}>
          {level}%
        </span>
      </div>
      <div style={{ height: 5, borderRadius: 3, background: "rgba(200,138,255,0.06)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 3,
            width: vis ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            transition: `width 1.2s cubic-bezier(0.23,1,0.32,1) ${delay * 0.07 + 0.2}s`,
            boxShadow: h ? `0 0 12px ${color}40` : `0 0 6px ${color}25`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, vis] = useRevealOnScroll(0.1);

  return (
    <section id="skills" style={{ padding: "100px 20px", maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <h2
        ref={ref}
        style={{
          textAlign: "center",
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 800,
          marginBottom: 50,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.8s ease",
        }}
      >
        <span style={{ color: "#f0e8ff" }}>✦ </span>
        <span style={{ color: "#c88aff" }}>Skills</span>
        <span style={{ color: "#f0e8ff" }}> ✦</span>
      </h2>

      {SKILLS.map((s, i) => (
        <SkillBar key={s.name} name={s.name} level={s.level} color={COLORS[i % COLORS.length]} delay={i} />
      ))}
    </section>
  );
}