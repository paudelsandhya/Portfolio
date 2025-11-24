import React, { useRef, useEffect } from "react";

const Footer = ({ hearts = [], isPlaying = false, setIsPlaying = () => {} }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <footer className="bg-gradient-to-r from-pink-200 to-purple-200 p-6 relative overflow-hidden">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/Portfolio/assets/SummerTimeSadness.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center justify-between relative z-10">
        {/* Flower Vase */}
        <div className="relative">
          <div className="w-16 h-20 bg-gradient-to-b from-green-400 to-green-600 rounded-t-2xl relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <span className="text-2xl">😘</span>
            </div>
          </div>

          {/* Animated Hearts and Flowers */}
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute bottom-16 animate-float-up"
              style={{
                left: `${heart.x}px`,
                animationDelay: `${heart.delay}ms`,
                animationDuration: "4s",
              }}
            >
              {Math.random() > 0.5 ? "❤️" : "🌸"}
            </div>
          ))}
        </div>

        {/* Thank you message */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <p className="text-black italic text-lg">Thank you for visiting.</p>
        </div>

        {/* Music Player */}
        <div
          className="text-6xl cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={toggleMusic}
        >
          {isPlaying ? "🎵" : "🎶"}
        </div>
      </div>
    </footer>
  );
};

export default Footer;