import { useRef, useEffect } from "react";

export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 200;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.25 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    const shootingStars = [];
    const spawnShootingStar = () => {
      if (Math.random() < 0.006 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 6 + 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 1,
        });
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.y += s.speed;
        s.twinkle += s.twinkleSpeed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          s.x += dx * 0.006;
          s.y += dy * 0.006;
        }
        const alpha = 0.35 + Math.sin(s.twinkle) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 215, 255, ${alpha})`;
        ctx.fill();
        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 190, 255, ${alpha * 0.1})`;
          ctx.fill();
        }
      });

      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const endX = ss.x - Math.cos(ss.angle) * ss.length;
        const endY = ss.y - Math.sin(ss.angle) * ss.length;
        const grad = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
        grad.addColorStop(0, `rgba(220, 230, 255, ${ss.opacity})`);
        grad.addColorStop(1, `rgba(220, 230, 255, 0)`);
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.008;
        if (ss.opacity <= 0 || ss.y > canvas.height || ss.x > canvas.width) {
          shootingStars.splice(i, 1);
        }
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
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
