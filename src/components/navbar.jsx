import { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/skills";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ["contact", "experience", "skills", "projects", "about"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "16px 0",
        display: "flex",
        justifyContent: "center",
        gap: 36,
        zIndex: 100,
        background: scrolled
          ? "rgba(10, 10, 25, 0.8)"
          : "rgba(15, 15, 30, 0.2)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      {NAV_LINKS.map((link) => {
        const sectionId = link.href.replace("#", "");
        const isActive = active === sectionId;
        return (
          <a
            key={link.label}
            href={link.href}
            style={{
              color: isActive ? "#a8c6ff" : "#8a90b8",
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: "0.5px",
              fontSize: "0.9rem",
              transition: "all 0.3s ease",
              textShadow: isActive
                ? "0 0 16px rgba(168,198,255,0.5)"
                : "none",
              padding: "4px 0",
              borderBottom: isActive
                ? "2px solid rgba(168,198,255,0.5)"
                : "2px solid transparent",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.target.style.color = "#b8c8ee";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.target.style.color = "#8a90b8";
            }}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
