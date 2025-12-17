import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import AboutBox from "./components/AboutBox.jsx";
import ConnectBox from "./components/ConnectBox.jsx";
import GalleryBox from "./components/GalleryBox.jsx";
import ShowcaseBox from "./components/ShowcaseBox.jsx";
import FloatingElements from "./components/FloatingElements.jsx";
import Showcase from "./components/Showcase.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import TypeWriter from "./components/TypeWriter.jsx";

// Home page component
const HomePage = ({ openBoxes, toggleBox, hearts, isPlaying, setIsPlaying, vasePosition, setVasePosition }) => (
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
        {heart.type === "heart" ? "💖" : heart.type === "flower1" ? "🌸" : heart.type === "flower2" ? "🌺" : heart.type === "butterfly" ? "🦋" : ""}
      </div>
    ))}

    <Header />

    {/* Main content with proper top spacing for fixed header */}
    <div className="flex-1 min-h-screen flex items-center justify-center pt-36 md:pt-44 pb-32 md:pb-40 px-4 md:px-8">
      {/* Mobile & Tablet: 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl w-full lg:hidden">
        <AboutBox open={openBoxes[0]} toggle={() => toggleBox(0)} />
        <GalleryBox open={openBoxes[2]} toggle={() => toggleBox(2)} />
        <ShowcaseBox open={openBoxes[3]} toggle={() => toggleBox(3)} />
        <ConnectBox open={openBoxes[1]} toggle={() => toggleBox(1)} />
      </div>

      {/* Desktop: Custom 3-column layout */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(280px,360px)_1fr_minmax(350px,300px)] gap-6 max-w-[1500px] w-full items-center px-8">
        {/* Left Column: Navigation Boxes */}
        <div className="flex flex-col gap-4">
          <AboutBox open={openBoxes[0]} toggle={() => toggleBox(0)} />
          <GalleryBox open={openBoxes[2]} toggle={() => toggleBox(2)} />
          <ShowcaseBox open={openBoxes[3]} toggle={() => toggleBox(3)} />
        </div>

        {/* Center Column: Hero Text */}
        <div className="text-center space-y-4 px-4">
          <h1 className="text-5xl font-bold text-white/90">Hi! It's me,</h1>
          <h2 className="text-6xl font-bold text-red-600 drop-shadow-lg italic">Sandhya Paudel</h2>
          <p className="text-3xl font-light text-white/80 min-h-[3rem] flex items-center justify-center">
            <span className="inline-block min-w-[420px]">
              <TypeWriter />
            </span>
          </p>
        </div>

        {/* Right Column: Connect Box */}
        <div className="h-full flex flex-col">
          <ConnectBox open={openBoxes[1]} toggle={() => toggleBox(1)} />
        </div>
      </div>
    </div>

    <FloatingElements
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      setVasePosition={setVasePosition}
    />
  </section>
);

const App = () => {
  const [openBoxes, setOpenBoxes] = useState([false, true, false, false]);
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
      const types = ["heart", "flower1", "flower2", "butterfly"];
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
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            openBoxes={openBoxes}
            toggleBox={toggleBox}
            hearts={hearts}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            vasePosition={vasePosition}
            setVasePosition={setVasePosition}
          />
        }
      />
      <Route path="/About" element={<About />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="/showcase" element={<Showcase />} />
    </Routes>
  );
};

export default App;


