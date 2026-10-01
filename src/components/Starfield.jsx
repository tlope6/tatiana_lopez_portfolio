// import { useRef, useEffect } from "react";

// export default function StarfieldBackground() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let animationId;
//     let mouse = { x: -9999, y: -9999 };

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     const STAR_COUNT = 200;
//     const stars = Array.from({ length: STAR_COUNT }, () => ({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       r: Math.random() * 1.8 + 0.3,
//       speed: Math.random() * 0.25 + 0.05,
//       twinkle: Math.random() * Math.PI * 2,
//       twinkleSpeed: Math.random() * 0.02 + 0.005,
//     }));

//     const shootingStars = [];
//     const spawnShootingStar = () => {
//       if (Math.random() < 0.006 && shootingStars.length < 2) {
//         shootingStars.push({
//           x: Math.random() * canvas.width,
//           y: 0,
//           length: Math.random() * 80 + 40,
//           speed: Math.random() * 6 + 4,
//           angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
//           opacity: 1,
//         });
//       }
//     };

//     const handleMouseMove = (e) => {
//       mouse.x = e.clientX;
//       mouse.y = e.clientY;
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       stars.forEach((s) => {
//         s.y += s.speed;
//         s.twinkle += s.twinkleSpeed;
//         if (s.y > canvas.height) {
//           s.y = 0;
//           s.x = Math.random() * canvas.width;
//         }
//         const dx = s.x - mouse.x;
//         const dy = s.y - mouse.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         if (dist < 120) {
//           s.x += dx * 0.006;
//           s.y += dy * 0.006;
//         }
//         const alpha = 0.35 + Math.sin(s.twinkle) * 0.35;
//         ctx.beginPath();
//         ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(200, 215, 255, ${alpha})`;
//         ctx.fill();
//         if (s.r > 1.2) {
//           ctx.beginPath();
//           ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(160, 190, 255, ${alpha * 0.1})`;
//           ctx.fill();
//         }
//       });

//       spawnShootingStar();
//       for (let i = shootingStars.length - 1; i >= 0; i--) {
//         const ss = shootingStars[i];
//         const endX = ss.x - Math.cos(ss.angle) * ss.length;
//         const endY = ss.y - Math.sin(ss.angle) * ss.length;
//         const grad = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
//         grad.addColorStop(0, `rgba(220, 230, 255, ${ss.opacity})`);
//         grad.addColorStop(1, `rgba(220, 230, 255, 0)`);
//         ctx.beginPath();
//         ctx.moveTo(ss.x, ss.y);
//         ctx.lineTo(endX, endY);
//         ctx.strokeStyle = grad;
//         ctx.lineWidth = 1.5;
//         ctx.stroke();
//         ss.x += Math.cos(ss.angle) * ss.speed;
//         ss.y += Math.sin(ss.angle) * ss.speed;
//         ss.opacity -= 0.008;
//         if (ss.opacity <= 0 || ss.y > canvas.height || ss.x > canvas.width) {
//           shootingStars.splice(i, 1);
//         }
//       }
//       animationId = requestAnimationFrame(draw);
//     };
//     draw();
//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener("resize", resize);
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         zIndex: 0,
//         pointerEvents: "none",
//       }}
//     />
//   );
// }


// import { useState, useEffect } from "react";
// import { NAV_LINKS } from "../data/skills";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [active, setActive] = useState("home");

//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 60);
//       const ids = ["contact", "experience", "skills", "projects", "about", "home"];
//       for (const id of ids) {
//         const el = document.getElementById(id);
//         if (el && el.getBoundingClientRect().top <= 150) {
//           setActive(id);
//           return;
//         }
//       }
//     };
//     window.addEventListener("scroll", onScroll);
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <nav
//       style={{
//         position: "fixed",
//         top: 0,
//         width: "100%",
//         padding: "12px 0",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 8,
//         zIndex: 100,
//         background: scrolled ? "rgba(8,5,18,0.85)" : "rgba(8,5,18,0.4)",
//         backdropFilter: "blur(16px)",
//         borderBottom: scrolled
//           ? "1px solid rgba(200,138,255,0.08)"
//           : "1px solid transparent",
//         transition: "all 0.4s ease",
//       }}
//     >
//       <span
//         style={{
//           fontFamily: "'Syne', sans-serif",
//           fontWeight: 800,
//           fontSize: "1rem",
//           color: "#c88aff",
//           marginRight: 20,
//           letterSpacing: "-0.5px",
//         }}
//       >
//         TL
//       </span>

//       {NAV_LINKS.map((link) => {
//         const id = link.href.replace("#", "");
//         const isActive = active === id;
//         return (
          
//             key={link.label}
//             href={link.href}
//             style={{
//               color: isActive ? "#e0d0ff" : "#6a5a88",
//               textDecoration: "none",
//               fontWeight: 600,
//               fontSize: "0.75rem",
//               letterSpacing: "0.5px",
//               textTransform: "uppercase",
//               padding: "6px 14px",
//               borderRadius: 20,
//               background: isActive
//                 ? "rgba(200,138,255,0.12)"
//                 : "transparent",
//               border: isActive
//                 ? "1px solid rgba(200,138,255,0.2)"
//                 : "1px solid transparent",
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) => {
//               if (!isActive) e.target.style.color = "#b8a0d8";
//             }}
//             onMouseLeave={(e) => {
//               if (!isActive) e.target.style.color = "#6a5a88";
//             }}
//           >
//             {link.label}
//           </a>
//         );
//       })}

      
//         href="mailto:Tatianamlopez27@gmail.com"
//         style={{
//           marginLeft: 16,
//           padding: "7px 20px",
//           borderRadius: 20,
//           background: "linear-gradient(135deg, #c88aff, #a060e0)",
//           color: "#fff",
//           textDecoration: "none",
//           fontWeight: 700,
//           fontSize: "0.72rem",
//           letterSpacing: "0.5px",
//           textTransform: "uppercase",
//           boxShadow: "0 0 20px rgba(200,138,255,0.2)",
//           transition: "all 0.3s ease",
//         }}
//         onMouseEnter={(e) =>
//           (e.target.style.boxShadow = "0 0 30px rgba(200,138,255,0.4)")
//         }
//         onMouseLeave={(e) =>
//           (e.target.style.boxShadow = "0 0 20px rgba(200,138,255,0.2)")
//         }
//       >
//         Hire Me
//       </a>
//     </nav>
//   );
// }


import { useRef, useEffect } from "react";

export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let id;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = document.body.scrollHeight || window.innerHeight * 5;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 500 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.3 + 0.2,
      t: Math.random() * Math.PI * 2,
      ts: Math.random() * 0.012 + 0.003,
      hue: 260 + Math.random() * 40,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach((s) => {
        s.t += s.ts;
        const a = 0.2 + Math.sin(s.t) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 45%, 82%, ${a})`;
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}