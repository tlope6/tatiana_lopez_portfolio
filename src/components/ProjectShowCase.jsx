import { useState } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export default function ProjectShowcase({ project, index, total }) {
  const [ref, isVisible] = useRevealOnScroll(0.1);
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: isEven ? "row" : "row-reverse",
        gap: 40,
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "60px 0",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
        borderBottom:
          index < total - 1
            ? "1px solid rgba(255,255,255,0.04)"
            : "none",
      }}
    >
      {/* Image / Preview side */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex: "1 1 350px",
          maxWidth: 480,
          aspectRatio: "16/10",
          borderRadius: 16,
          background: project.image
            ? "transparent"
            : `linear-gradient(135deg, ${project.color}15, ${project.color}08)`,
          border: `1px solid ${project.color}25`,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.5s ease",
          boxShadow: hovered
            ? `0 8px 40px ${project.color}20`
            : "0 4px 20px rgba(0,0,0,0.2)",
          transform: hovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{ textAlign: "center", padding: 40 }}>
            <div
              style={{ fontSize: "2.5rem", marginBottom: 12, opacity: 0.6 }}
            >
              {index === 0 ? "🎵" : index === 1 ? "📸" : "💰"}
            </div>
            <div
              style={{
                color: project.color,
                fontSize: "0.85rem",
                fontWeight: 600,
                opacity: 0.7,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {project.subtitle.split("·")[0].trim()}
            </div>
          </div>
        )}
      </div>

      {/* Info side */}
      <div style={{ flex: "1 1 350px", maxWidth: 520 }}>
        <div
          style={{
            fontSize: "0.75rem",
            color: project.color,
            fontWeight: 600,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 10,
            opacity: 0.8,
          }}
        >
          {project.subtitle}
        </div>

        <h3
          style={{
            fontSize: "1.8rem",
            color: "#e0e4ff",
            margin: "0 0 14px",
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            color: "#9da4c4",
            lineHeight: 1.7,
            fontSize: "0.95rem",
            margin: "0 0 20px",
          }}
        >
          {project.description}
        </p>

        <div style={{ margin: "0 0 20px" }}>
          {project.details.map((detail, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 8,
                fontSize: "0.88rem",
                color: "#b0b6d0",
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  color: project.color,
                  flexShrink: 0,
                  marginTop: 2,
                  opacity: 0.7,
                }}
              >
                ▸
              </span>
              {detail}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.72rem",
                padding: "4px 12px",
                borderRadius: 20,
                background: `${project.color}10`,
                border: `1px solid ${project.color}25`,
                color: project.color,
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#c4d0ff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.88rem",
              padding: "8px 20px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.06)";
              e.target.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            View Code →
          </a>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#a8ffc4",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.88rem",
                padding: "8px 20px",
                borderRadius: 10,
                background: "rgba(168, 255, 196, 0.06)",
                border: "1px solid rgba(168, 255, 196, 0.15)",
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(168, 255, 196, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(168, 255, 196, 0.06)";
              }}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
