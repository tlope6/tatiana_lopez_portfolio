import { useState } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const EXPERIENCES = [

    { id: 1, 
      role : "Sales & Customer Intern",
      company: "HERE Technologies",
      date: "June 2026 - Present", 
      bullets : [
        "Supported HERE's Customer Organization (CCO AMER) on projects accelerating revenue generation and competitve positioning",
        "Collaborated with the Business Solutions Architecture team on dicsovery and prototyping initiatives",
        "Conducted research on team knowledge gaps and sales demos to indetify opportunites for AI Integration",

      ],
      color: "#f2f3d9"
    },
    {
        id: 2, 
        role: "Supply Chain Document Processing Extern", 
        company:"Extern", 
        date: "March 2026 - June 2026", 
        bullets : [
            "Built Python-based workflows to extract and process data from pharmaceutical documents using OCR", 
            "Evaluated and compared OCR engines for handling complex document layouts", 
            "Developed retrieval-augmented generation (RAG) systems for intelligent document search", 
            "Designed a chatbot interface for querying supply chain data", 
            "Applied classification and automation techniques to route and process documents ", 
            "Integrated components into an end-to-end AI-powered document processing pipeline",

        ], 
        color : "#ff8a9e", 

    }, 
    {


        id: 3, 
        role: "Software Engineer Intern", 
        company: "McDonald's Corporation", 
        date: "May 2024",
        bullets: [
            " Developed a gamified onboarding system to boost new hire engagement through interactive learning experiences", 
            "Collaborated cross-functionally to integrate Squarespace and third-party tools, improving workflow efficiency and system functionality", 
            "Drove process improvements through data analysis and project management, identifying optimization opportunities across onboarding workflows"


        ], 
        color: "#7c8aff",
    }
];


function ExperienceCard({ experience, index }) {
  const [ref, isVisible] = useRevealOnScroll(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: 24,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s ease ${index * 0.15}s`,
      }}
    >
      {/* Timeline line + dot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: hovered ? experience.color : "transparent",
            border: `2px solid ${experience.color}`,
            boxShadow: hovered ? `0 0 15px ${experience.color}50` : "none",
            transition: "all 0.3s ease",
            marginTop: 6,
          }}
        />
        <div
          style={{
            width: 2,
            flex: 1,
            background: `linear-gradient(to bottom, ${experience.color}40, transparent)`,
            marginTop: 8,
          }}
        />
      </div>

      {/* Content card */}
      <div
        style={{
          flex: 1,
          background: hovered
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.03)",
          padding: "28px 32px",
          borderRadius: 16,
          border: hovered
            ? `1px solid ${experience.color}30`
            : "1px solid rgba(255,255,255,0.06)",
          transition: "all 0.4s ease",
          marginBottom: 24,
          boxShadow: hovered ? `0 4px 30px ${experience.color}10` : "none",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            color: experience.color,
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: 8,
            opacity: 0.8,
          }}
        >
          {experience.date}
        </div>

        <h3
          style={{
            fontSize: "1.3rem",
            color: "#e0e4ff",
            margin: "0 0 4px",
            fontWeight: 700,
          }}
        >
          {experience.role}
        </h3>
        <div
          style={{
            fontSize: "0.95rem",
            color: "#8a92b8",
            marginBottom: 14,
            fontWeight: 500,
          }}
        >
          {experience.company}
        </div>

        <p
          style={{
            color: "#9da4c4",
            lineHeight: 1.7,
            fontSize: "0.92rem",
            margin: "0 0 16px",
          }}
        >
          {experience.description}
        </p>

        <div>
          {experience.bullets.map((bullet, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 6,
                fontSize: "0.88rem",
                color: "#b0b6d0",
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  color: experience.color,
                  flexShrink: 0,
                  marginTop: 2,
                  opacity: 0.7,
                }}
              >
                ▸
              </span>
              {bullet}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, isVisible] = useRevealOnScroll(0.05);

  return (
    <section
      id="experience"
      style={{
        padding: "100px 20px",
        maxWidth: 800,
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
          marginBottom: 50,
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
        Experience
      </h2>

      {EXPERIENCES.map((exp, i) => (
        <ExperienceCard key={exp.id} experience={exp} index={i} />
      ))}
    </section>
  );
}
