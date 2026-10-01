import { useState } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { EXPERIENCES } from "../data/experiences";

function TimelineCard({ item, index }) {
  const [ref, vis] = useRevealOnScroll(0.1);
  const [h, setH] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        gap: 20,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(35px)",
        transition: `all 0.8s ease ${index * 0.15}s`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: 14, height: 14, borderRadius: "50%",
            background: h ? item.color : "transparent",
            border: `2px solid ${item.color}`,
            boxShadow: h ? `0 0 12px ${item.color}50` : "none",
            transition: "all 0.3s", marginTop: 4,
          }}
        />
        <div style={{ width: 2, flex: 1, background: `linear-gradient(to bottom, ${item.color}30, transparent)`, marginTop: 6 }} />
      </div>

      <div
        style={{
          flex: 1,
          background: h ? "rgba(200,138,255,0.06)" : "rgba(200,138,255,0.02)",
          padding: "22px 26px", borderRadius: 16,
          border: h ? `1px solid ${item.color}25` : "1px solid rgba(200,138,255,0.05)",
          transition: "all 0.4s ease", marginBottom: 20,
          boxShadow: h ? `0 4px 25px ${item.color}10` : "none",
        }}
      >
        <div style={{ fontSize: "0.7rem", color: item.color, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>
          {item.date}
        </div>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", color: "#f0e8ff", margin: "0 0 4px", fontWeight: 700 }}>
          {item.role}
        </h3>
        <div style={{ color: "#7a6fa8", fontSize: "0.88rem", marginBottom: 10 }}>
          {item.company}
        </div>
        {item.bullets.map((b, j) => (
          <div key={j} style={{ display: "flex", gap: 8, fontSize: "0.82rem", color: "#9a8ac0", marginBottom: 4 }}>
            <span style={{ color: item.color, opacity: 0.6 }}>▸</span>{b}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, vis] = useRevealOnScroll(0.05);

  return (
    <section id="experience" style={{ padding: "100px 20px", maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <h2
        ref={ref}
        style={{
          textAlign: "center",
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 800, marginBottom: 50,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.8s ease",
        }}
      >
        <span style={{ color: "#f0e8ff" }}>✦ </span>
        <span style={{ color: "#c88aff" }}>Experience</span>
        <span style={{ color: "#f0e8ff" }}> ✦</span>
      </h2>

      {EXPERIENCES.map((e, i) => (
        <TimelineCard key={i} item={e} index={i} />
      ))}
    </section>
  );
}