import { useState } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import ProjectShowcase from "./ProjectShowCase";
import { PROJECTS, FILTER_TAGS } from "../data/projects";

function FilterTab({ label, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "8px 20px",
        borderRadius: 25,
        border: isActive
          ? "1px solid rgba(168,198,255,0.4)"
          : hovered
          ? "1px solid rgba(255,255,255,0.15)"
          : "1px solid rgba(255,255,255,0.06)",
        background: isActive
          ? "rgba(168,198,255,0.15)"
          : hovered
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.02)",
        color: isActive ? "#b4c8ff" : hovered ? "#c5cce6" : "#6e7494",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.5px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        outline: "none",
        fontFamily: "inherit",
        boxShadow: isActive
          ? "0 0 15px rgba(168,198,255,0.1)"
          : "none",
        transform: isActive
          ? "scale(1.05)"
          : hovered
          ? "scale(1.02)"
          : "scale(1)",
      }}
    >
      {label}
    </button>
  );
}

export default function Projects() {
  const [ref, isVisible] = useRevealOnScroll(0.);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filters.includes(activeFilter));

  return (
    <section
      id="projects"
      style={{
        padding: "100px 20px 40px",
        maxWidth: 1100,
        margin: "auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h2
        ref={ref}
        style={{
          textAlign: "center",
          fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
          marginBottom: 20,
          background: "linear-gradient(135deg, #b5c8ff, #d8b4fe)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          fontWeight: 700,
        }}
      >
        Projects
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#6e7494",
          fontSize: "0.95rem",
          marginBottom: 30,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s ease 0.3s",
        }}
      >
        A selection of things I've built — filter by technology
      </p>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 40,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s ease 0.4s",
        }}
      >
        {FILTER_TAGS.map((tag) => (
          <FilterTab
            key={tag}
            label={tag}
            isActive={activeFilter === tag}
            onClick={() => setActiveFilter(tag)}
          />
        ))}
      </div>

      {/* Filtered projects */}
      <div
        style={{
          transition: "all 0.5s ease",
        }}
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, i) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={i}
              total={filteredProjects.length}
            />
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#6e7494",
              padding: "60px 0",
              fontSize: "0.95rem",
            }}
          >
            No projects match this filter yet — more coming soon!
          </p>
        )}
      </div>
    </section>
  );
}
