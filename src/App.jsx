import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import AboutBox from "./components/AboutBox.jsx";
import ConnectBox from "./components/ConnectBox.jsx";
import GalleryBox from "./components/GalleryBox.jsx";
import ResumeBox from "./components/ResumeBox.jsx";
import FloatingElements from "./components/FloatingElements.jsx";

const App = () => {
  const [letterOpen, setLetterOpen] = useState(false);
  const [openBoxes, setOpenBoxes] = useState([false, false, false, false]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [vasePosition, setVasePosition] = useState({ x: 90, bottom: 100 });

  const toggleBox = (index) => {
    setOpenBoxes((prev) => {
      const newBoxes = [...prev];
      newBoxes[index] = !newBoxes[index];
      return newBoxes;
    });
  };

  // Floating petals animation effect
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const interval = setInterval(() => {
      const duration = 8000; // 8 seconds lifespan
      const vaseSpread = 80;
      const types = ["heart", "flower", "butterfly"];
      const type = types[Math.floor(Math.random() * types.length)];

      const newHeart = {
        id: Date.now() + Math.random(),
        x: vasePosition.x + (Math.random() * vaseSpread - vaseSpread / 2),
        startBottom: vasePosition.bottom + Math.random() * 15,
        type,
        delay: Math.random() * 1000,
        duration,
        drift: (Math.random() - 0.3) * window.innerWidth,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
      }, duration);
    }, 1200);

    return () => clearInterval(interval);
  }, [vasePosition]);

  return (
    <section className="min-h-screen bg-[#FFC5D3] font-sans relative overflow-hidden">
      {/* Floating Hearts and Flowers */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`fixed pointer-events-none z-10 ${heart.type === "butterfly" ? "animate-butterfly-flight" : "animate-float-up"}`}
          style={{
            left: `${heart.x}px`,
            bottom: `${heart.startBottom}px`,
            animationDelay: `${heart.delay}ms`,
            animationDuration: `${heart.duration}ms`,
            "--drift-x": `${heart.drift}px`,
            fontSize: heart.type === "butterfly" ? "1.75rem" : "1.35rem",
          }}
        >
          {heart.type === "heart" ? "💖" : heart.type === "flower" ? "🌸" : "🦋"}
        </div>
      ))}

      <Header letterOpen={letterOpen} setLetterOpen={setLetterOpen} />

      {/* Main content with proper top spacing for fixed header */}
      <div className="flex-1 min-h-screen flex items-center justify-center pt-36 md:pt-44 pb-32 md:pb-40 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl w-full">
          <AboutBox open={openBoxes[0]} toggle={() => toggleBox(0)} />
          <ConnectBox open={openBoxes[1]} toggle={() => toggleBox(1)} />
          <GalleryBox open={openBoxes[2]} toggle={() => toggleBox(2)} />
          <ResumeBox open={openBoxes[3]} toggle={() => toggleBox(3)} />
        </div>
      </div>

      <FloatingElements
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setVasePosition={setVasePosition}
      />
    </section>
  );
};

export default App;