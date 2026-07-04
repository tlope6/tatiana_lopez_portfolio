import { useState, useEffect, useRef, useCallback } from "react";

const ROLES = [
  "Software Developer",
  "Creative Problem Solver",
  "Data Enthusiast",
  "Lifelong Learner",
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typing effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  // Orbiting stars + constellation canvas around the name
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let clickBursts = [];

    const resize = () => {
      const container = containerRef.current;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Orbiting stars around the name area
    const centerX = () => canvas.width / 2;
    const centerY = () => canvas.height / 2;

    // Create orbital rings of stars
    const orbitStars = [];
    const RING_COUNT = 3;
    const STARS_PER_RING = [12, 18, 24];
    const RING_RADII = [140, 220, 320];
    const RING_SPEEDS = [0.003, -0.002, 0.0015];

    for (let ring = 0; ring < RING_COUNT; ring++) {
      for (let i = 0; i < STARS_PER_RING[ring]; i++) {
        const angle = (Math.PI * 2 * i) / STARS_PER_RING[ring];
        orbitStars.push({
          ring,
          baseAngle: angle,
          angle,
          radius: RING_RADII[ring] + (Math.random() - 0.5) * 30,
          size: Math.random() * 2.2 + 0.5,
          speed: RING_SPEEDS[ring] * (0.8 + Math.random() * 0.4),
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          hue: 210 + Math.random() * 60, // blue to purple range
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.01 + 0.005,
          wobbleAmount: Math.random() * 15 + 5,
        });
      }
    }

    // Floating accent particles
    const floaters = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.3 + 0.1,
      hue: 200 + Math.random() * 80,
    }));

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Create burst of particles
      for (let i = 0; i < 15; i++) {
        const angle = (Math.PI * 2 * i) / 15 + Math.random() * 0.3;
        const speed = Math.random() * 3 + 1.5;
        clickBursts.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1,
          alpha: 1,
          hue: 200 + Math.random() * 80,
          life: 1,
        });
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = centerX();
      const cy = centerY();

      // Draw faint orbital rings
      RING_RADII.forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140, 160, 220, ${0.04 - i * 0.01})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw orbiting stars
      orbitStars.forEach((s) => {
        s.angle += s.speed;
        s.twinkle += s.twinkleSpeed;
        s.wobble += s.wobbleSpeed;

        const wobbleOffset = Math.sin(s.wobble) * s.wobbleAmount;
        const r = s.radius + wobbleOffset;
        const x = cx + Math.cos(s.angle) * r;
        const y = cy + Math.sin(s.angle) * (r * 0.4); // elliptical orbit

        s.currentX = x;
        s.currentY = y;

        const alpha = 0.3 + Math.sin(s.twinkle) * 0.4;

        // Mouse interaction — stars glow brighter near cursor
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseGlow = dist < 80 ? (1 - dist / 80) * 0.6 : 0;

        // Star body
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 70%, 80%, ${alpha + mouseGlow})`;
        ctx.fill();

        // Glow
        if (s.size > 1 || mouseGlow > 0) {
          ctx.beginPath();
          ctx.arc(x, y, s.size * (3 + mouseGlow * 4), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue}, 60%, 70%, ${(alpha * 0.12) + mouseGlow * 0.15})`;
          ctx.fill();
        }

        // Cross-sparkle for larger stars
        if (s.size > 1.5) {
          const sparkleAlpha = alpha * 0.3;
          const sparkleLen = s.size * 6;
          ctx.strokeStyle = `hsla(${s.hue}, 60%, 85%, ${sparkleAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x - sparkleLen, y);
          ctx.lineTo(x + sparkleLen, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y - sparkleLen);
          ctx.lineTo(x, y + sparkleLen);
          ctx.stroke();
        }
      });

      // Draw constellation lines between nearby stars in same ring
      for (let ring = 0; ring < RING_COUNT; ring++) {
        const ringStars = orbitStars.filter((s) => s.ring === ring);
        for (let i = 0; i < ringStars.length; i++) {
          const a = ringStars[i];
          const b = ringStars[(i + 1) % ringStars.length];
          if (a.currentX && b.currentX) {
            const dx = a.currentX - b.currentX;
            const dy = a.currentY - b.currentY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 160) {
              const lineAlpha = (1 - dist / 160) * 0.08;
              ctx.beginPath();
              ctx.moveTo(a.currentX, a.currentY);
              ctx.lineTo(b.currentX, b.currentY);
              ctx.strokeStyle = `rgba(160, 180, 240, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Mouse constellation — draw lines from cursor to nearby stars
      orbitStars.forEach((s) => {
        if (s.currentX) {
          const dx = s.currentX - mouse.x;
          const dy = s.currentY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.2;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(s.currentX, s.currentY);
            ctx.strokeStyle = `rgba(180, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      // Floating particles
      floaters.forEach((f) => {
        f.x += f.speedX;
        f.y += f.speedY;
        if (f.x < 0) f.x = canvas.width;
        if (f.x > canvas.width) f.x = 0;
        if (f.y < 0) f.y = canvas.height;
        if (f.y > canvas.height) f.y = 0;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${f.hue}, 50%, 75%, ${f.alpha})`;
        ctx.fill();
      });

      // Click burst particles
      for (let i = clickBursts.length - 1; i >= 0; i--) {
        const p = clickBursts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.02;
        p.alpha = p.life;

        if (p.life <= 0) {
          clickBursts.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 80%, ${p.alpha})`;
        ctx.fill();

        // Trail
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 70%, ${p.alpha * 0.15})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  const displayText = ROLES[roleIndex].slice(0, charIndex);

  return (
    <div
      id="home"
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Orbiting stars canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          cursor: "crosshair",
        }}
      />

      {/* Nebula glow layers */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,70,180,0.14) 0%, rgba(60,100,220,0.06) 40%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(140,100,220,0.1) 0%, transparent 60%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
          transform: "translate(100px, -50px)",
        }}
      />

      {/* Name */}
      <h1
        style={{
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          fontWeight: 700,
          background: "linear-gradient(135deg, #c0d9ff, #d8b4fe, #93c5fd, #c4b5fd)",
          backgroundSize: "300% 300%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientShift 6s ease infinite",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
          margin: "0 0 6px",
          letterSpacing: "-1.5px",
          lineHeight: 1.1,
          position: "relative",
          zIndex: 2,
          textShadow: "0 0 40px rgba(180,160,255,0.15)",
        }}
      >
        Tatiana Lopez
      </h1>

      {/* Decorative line under name */}
      <div
        style={{
          width: loaded ? 60 : 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(180,200,255,0.5), transparent)",
          transition: "width 1.5s ease 0.8s",
          marginBottom: 20,
          position: "relative",
          zIndex: 2,
        }}
      />

      {/* Typing effect subtitle */}
      <div
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
          color: "#8a92b8",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.5s ease 0.3s, transform 1.5s ease 0.3s",
          fontWeight: 400,
          letterSpacing: "1px",
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
          position: "relative",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#6e7494" }}>I'm a{" "}</span>
        <span
          style={{
            color: "#b4c8ff",
            marginLeft: 8,
            fontWeight: 600,
            minWidth: 200,
            textAlign: "left",
          }}
        >
          {displayText}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: "1.2em",
              background: "#b4c8ff",
              marginLeft: 2,
              verticalAlign: "text-bottom",
              animation: "blink 1s step-end infinite",
            }}
          />
        </span>
      </div>

      {/* Interactive hint */}
      <p
        style={{
          fontSize: "0.72rem",
          color: "#4a4f6e",
          letterSpacing: "2px",
          textTransform: "uppercase",
          opacity: loaded ? 1 : 0,
          transition: "opacity 2s ease 2s",
          marginBottom: 24,
          position: "relative",
          zIndex: 2,
        }}
      >
        ✦ click anywhere to create stardust ✦
      </p>

      {/* CTA button */}
      <a
        href="#about"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.8s ease 0.6s, transform 1.8s ease 0.6s",
          padding: "12px 32px",
          borderRadius: 30,
          background: "rgba(168, 198, 255, 0.1)",
          border: "1px solid rgba(168, 198, 255, 0.25)",
          color: "#b4c8ff",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.9rem",
          letterSpacing: "0.5px",
          position: "relative",
          zIndex: 2,
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(168, 198, 255, 0.18)";
          e.target.style.boxShadow = "0 0 30px rgba(168,198,255,0.15)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(168, 198, 255, 0.1)";
          e.target.style.boxShadow = "none";
          e.target.style.transform = "translateY(0)";
        }}
      >
        Get to Know Me
      </a>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          opacity: loaded ? 0.4 : 0,
          transition: "opacity 2s ease 1.5s",
          animation: "float 3s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8a92b8"
          strokeWidth="2"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}