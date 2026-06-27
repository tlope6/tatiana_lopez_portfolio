import StarfieldBackground from "./components/StarfieldBackground";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div
      style={{
        margin: 0,
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        background:
          "radial-gradient(ellipse at top, #1a1b30 0%, #0c0d1a 60%)",
        color: "#e4e8ff",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0c0d1a; }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        ::selection {
          background: rgba(139, 165, 255, 0.3);
          color: #fff;
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0c0d1a; }
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 165, 255, 0.2);
          border-radius: 3px;
        }
      `}</style>

      <StarfieldBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
}
