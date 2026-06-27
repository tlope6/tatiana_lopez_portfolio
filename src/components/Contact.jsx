import { useState } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

function ContactLink({ label, href, icon, delay, parentVisible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? "#d0dcff" : "#8a92b8",
        fontSize: "1rem",
        textDecoration: "none",
        fontWeight: 600,
        transition: "all 0.3s ease",
        textShadow: hovered ? "0 0 16px rgba(168,198,255,0.4)" : "none",
        padding: "14px 28px",
        borderRadius: 14,
        background: hovered
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.02)",
        border: hovered
          ? "1px solid rgba(168,198,255,0.2)"
          : "1px solid rgba(255,255,255,0.05)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        transform: hovered
          ? "translateY(-3px)"
          : parentVisible
          ? "translateY(0)"
          : "translateY(20px)",
        opacity: parentVisible ? 1 : 0,
        transitionDelay: parentVisible ? `${delay * 0.12}s` : "0s",
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      {label}
    </a>
  );
}

export default function Contact() {
  const [ref, isVisible] = useRevealOnScroll(0.15);

  const links = [
    { label: "Email", href: "mailto:Tatianamlopez27@gmail.com", icon: "✉" },
    { label: "GitHub", href: "https://github.com/tlope6", icon: "⌨" },
    {
      label: "LinkedIn",
      href: "http://www.linkedin.com/in/tatianamlopez",
      icon: "🔗",
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: "100px 20px 140px",
        maxWidth: 800,
        margin: "auto",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
          marginBottom: 16,
          background: "linear-gradient(135deg, #b5c8ff, #d8b4fe)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
        }}
      >
        Let's Connect
      </h2>
      <p
        style={{
          color: "#6e7494",
          fontSize: "0.95rem",
          marginBottom: 40,
        }}
      >
        Feel free to reach out — I'm always open to new opportunities
      </p>
      <div
        ref={ref}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {links.map((link, i) => (
          <ContactLink
            key={link.label}
            {...link}
            delay={i}
            parentVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}
