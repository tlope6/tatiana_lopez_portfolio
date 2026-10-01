// import StarfieldBackground from "./components/StarfieldBackground";
// import Navbar from "./components/navbar";
// import Hero from "./components/hero";
// import Projects from "./components/Projects";
// import Skills from "./components/Skills";
// import Experience from "./components/Experience";
// import About from "./components/About";
// import Contact from "./components/Contact";

// export default function App() {
//   return (
//     <div
//       style={{
//         margin: 0,
//         fontFamily: "'Poppins', 'Segoe UI', sans-serif",
//         background:
//           "radial-gradient(ellipse at top, #1a1b30 0%, #0c0d1a 60%)",
//         color: "#e4e8ff",
//         minHeight: "100vh",
//         overflowX: "hidden",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         html { scroll-behavior: smooth; }
//         body { background: #0c0d1a; }

//         @keyframes gradientShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(8px); }
//         }
//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }

//         ::selection {
//           background: rgba(139, 165, 255, 0.3);
//           color: #fff;
//         }
//         ::-webkit-scrollbar { width: 5px; }
//         ::-webkit-scrollbar-track { background: #0c0d1a; }
//         ::-webkit-scrollbar-thumb {
//           background: rgba(139, 165, 255, 0.2);
//           border-radius: 3px;
//         }
//       `}</style>

//       <StarfieldBackground />
//       <Navbar />
//       <Hero />
//       <About />
//       <Projects />
//       <Skills />
//       <Experience />
//       <Contact />
//     </div>
//   );
// }



import Starfield from "./components/Starfield";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SkillsTicker from "./components/SkillsTicker";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div style={{
      margin: 0, fontFamily: "'Poppins', sans-serif",
      background: "#08051a", color: "#e8e0ff",
      minHeight: "100vh", position: "relative", overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #08051a; }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        ::selection { background: rgba(200, 138, 255, 0.3); color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #08051a; }
        ::-webkit-scrollbar-thumb { background: rgba(200, 138, 255, 0.15); border-radius: 3px; }
      `}</style>
      
      <Starfield />
      <Navbar />
      <Hero />
      <SkillsTicker />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
}