import { useState, useEffect } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import githubpic from "../assets/githubpic.png"

const headshot = githubpic;

function AnimatedCounter({ target, label, suffix, delay }) {
  const [ref, isVisible] = useRevealOnScroll(0.1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#b4c8ff",
          letterSpacing: "-1px",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: "0.78rem",
          color: "#6e7494",
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const [ref, isVisible] = useRevealOnScroll(0.1);

  const interests = [
    { emoji: "🎨", label: "Full-Stack Dev" },
    { emoji: "📊", label: "Data Science" },
    { emoji: "🎮", label: "Game Design" },
    { emoji: "❤️‍🩹", label: "Health informatics"},
  ];

  return (
    <section
      id="about"
      style={{
        padding: "100px 20px",
        maxWidth: 950,
        margin: "auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
          marginBottom: 50,
          background: "linear-gradient(135deg, #b5c8ff, #d8b4fe)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
        }}
      >
        About Me
      </h2>

      {/* Main about card */}
      <div
        ref={ref}
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          background: "rgba(255,255,255,0.04)",
          padding: "44px",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.15)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s ease",
          marginBottom: 30,
        }}
      >
        {/* Headshot */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: "3px solid rgba(168, 198, 255, 0.2)",
            boxShadow:
              "0 0 30px rgba(139, 165, 255, 0.12), 0 0 60px rgba(139, 165, 255, 0.06)",
            background: headshot
              ? "transparent"
              : "linear-gradient(135deg, rgba(124,138,255,0.2), rgba(216,180,254,0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {headshot ? (
            <img
              src={headshot}
              alt="Tatiana Lopez"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <span style={{ fontSize: "3.5rem", opacity: 0.5 }}>👩‍💻</span>
          )}
        </div>

        {/* Bio */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <p
            style={{
              color: "#b8bfd8",
              lineHeight: 1.85,
              fontSize: "1rem",
              margin: "0 0 16px",
            }}
          >
            As a CS major, I love exploring different applications of technology
            and I'm passionate about building systems that solve real-world
            problems. From efficient software to intuitive user experiences, I
            enjoy turning complex ideas into clean, practical solutions. Whether
            it's programming, debugging, or exploring new technologies, I thrive
            on the challenge that comes with solving technical problems. What I'm looking into right now are involving myself in tech either in health or in sales tech. 
          </p>
          <p
            style={{
              color: "#8a92b8",
              lineHeight: 1.8,
              fontSize: "1rem",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            I'm motivated by the idea of using technology to make a real
            difference.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 20,
          marginBottom: 30,
          padding: "28px 24px",
          background: "rgba(255,255,255,0.02)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <AnimatedCounter target={3} label="Projects Built" suffix="+" delay={0} />
        <AnimatedCounter target={11} label="Technologies" suffix="" delay={0.1} />
        <AnimatedCounter target={3} label="Languages" suffix="+" delay={0.2} />
        <AnimatedCounter target={100} label="Passion" suffix="%" delay={0.3} />
      </div>

      {/* Currently exploring */}
      <InterestCards interests={interests} />
    </section>
  );
}

function InterestCards({ interests }) {
  const [ref, isVisible] = useRevealOnScroll(0.1);

  return (
    <div ref={ref}>
      <p
        style={{
          textAlign: "center",
          color: "#6e7494",
          fontSize: "0.85rem",
          fontWeight: 600,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 16,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        Currently Exploring
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        {interests.map((item, i) => (
          <InterestBadge
            key={item.label}
            item={item}
            delay={i}
            parentVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}

function InterestBadge({ item, delay, parentVisible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "12px 22px",
        borderRadius: 14,
        background: hovered
          ? "rgba(180,200,255,0.1)"
          : "rgba(255,255,255,0.03)",
        border: hovered
          ? "1px solid rgba(168,198,255,0.25)"
          : "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "default",
        transition: "all 0.4s ease",
        transform: hovered
          ? "translateY(-3px)"
          : parentVisible
          ? "translateY(0)"
          : "translateY(20px)",
        opacity: parentVisible ? 1 : 0,
        transitionDelay: parentVisible ? `${delay * 0.1}s` : "0s",
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>{item.emoji}</span>
      <span
        style={{
          color: "#b0b8d4",
          fontSize: "0.88rem",
          fontWeight: 600,
        }}
      >
        {item.label}
      </span>
    </div>
  );
}
