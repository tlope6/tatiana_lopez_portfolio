import { useState } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { PROJECTS } from "../data/projects";

const FILTERS = ["All", "Python", "ML", "Vision", "UI/UX", "Figma"];

function ProjectCard({ project, index }) {
  const [ref, vis] = useRevealOnScroll(0.1);
  const [h, setH] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? "rgba(200,138,255,0.06)" : "rgba(200,138,255,0.02)",
        border: h ? `1px solid ${project.color}40` : "1px solid rgba(200,138,255,0.06)",
        borderRadius: 18,
        padding: 26,
        transition: "all 0.5s ease",
        transform: vis ? (h ? "translateY(-6px)" : "translateY(0)") : "translateY(40px)",
        opacity: vis ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        boxShadow: h ? `0 8px 35px ${project.color}15` : "none",
      }}
    >
      <div style={{ fontSize: "0.68rem", color: project.color, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>
        {project.subtitle}
      </div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.25rem", color: "#f0e8ff", margin: "0 0 10px", fontWeight: 700 }}>
        {project.title}
      </h3>
      <p style={{ color: "#8a7aaa", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 16 }}>
        {project.description}
      </p>
      <div style={{ marginBottom: 16 }}>
        {project.details.map((d, i) => (
          <div key={i} style={{ display: "flex", gap: 8, fontSize: "0.82rem", color: "#7a6fa8", marginBottom: 5, lineHeight: 1.4 }}>
            <span style={{ color: project.color, opacity: 0.6 }}>▸</span>{d}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {project.tech.map((t) => (
          <span key={t} style={{ fontSize: "0.68rem", padding: "3px 10px", borderRadius: 12, background: `${project.color}10`, border: `1px solid ${project.color}20`, color: project.color, fontWeight: 600 }}>
            {t}
          </span>
        ))}
      </div>
      <a
        href={project.liveLink || project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#b8a0d8",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.82rem",
          transition: "color 0.3s",
        }}
      >
        {project.tech.includes("Figma")
          ? "View Figma Prototype →"
          : "View Project Here →"}
      </a>
    </div>
  );
}

export default function Projects() {
  const [ref, vis] = useRevealOnScroll(0.05);
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter(
        (p) =>
          p.tech.some((t) => t.toLowerCase().includes(filter.toLowerCase())) ||
          p.subtitle.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <section id="projects" style={{ padding: "100px 20px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2
          ref={ref}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.8s ease",
          }}
        >
          <span style={{ color: "#f0e8ff" }}>✦ </span>
          <span style={{ color: "#c88aff" }}>Projects</span>
          <span style={{ color: "#f0e8ff" }}> ✦</span>
        </h2>
        <p style={{ color: "#6a5a88", fontSize: "0.88rem", marginTop: 8 }}>
          A selection of things I've built
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 18px",
              borderRadius: 20,
              cursor: "pointer",
              outline: "none",
              fontFamily: "inherit",
              border: filter === f ? "1px solid rgba(200,138,255,0.4)" : "1px solid rgba(200,138,255,0.08)",
              background: filter === f ? "rgba(200,138,255,0.14)" : "rgba(200,138,255,0.03)",
              color: filter === f ? "#c88aff" : "#6a5a88",
              fontSize: "0.78rem",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}