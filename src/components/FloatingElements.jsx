import { useRef, useEffect } from "react";
import PropTypes from 'prop-types';

const FloatingElements = ({
  isPlaying = false,
  setIsPlaying = () => {},
  setVasePosition = () => {},
}) => {
  const audioRef = useRef(null);
  const vaseRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Only auto-pause here. Starting playback must be initiated from a
    // user gesture (click) in the same call stack to satisfy browser
    // autoplay policies — so we trigger play directly in toggleMusic.
    if (!isPlaying) {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    const updatePosition = () => {
      if (!vaseRef.current || typeof window === "undefined") return;
      const rect = vaseRef.current.getBoundingClientRect();
      setVasePosition({
        x: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + 5,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [setVasePosition]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    // If no audio element yet, just toggle state
    if (!audio) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (!isPlaying) {
      // Attempt to play immediately within the click handler so it's
      // considered a user gesture (avoids autoplay blocking).
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Error playing audio:", error);
          // Ensure state reflects actual playback status
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/Portfolio/assets/SummerTimeSadness.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Flower Vase - Bottom Left */}
  <div className="fixed bottom-6 left-8 md:bottom-8 md:left-8 z-30 pointer-events-none transform -translate-x-1" ref={vaseRef}>
        <div className="relative w-48 h-32">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex space-x-2 text-2xl">
            <span className="animate-pulse">🌿</span>
            <span className="animate-pulse">🦋</span>
            <span className="animate-pulse">🌸</span>
            <span className="animate-pulse">💖</span>
          </div>
          
          {/* Single unified vase shape */}
          <svg viewBox="0 0 150 160" className="w-full h-full">
            <defs>
              <linearGradient id="vaseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#fcd34d', stopOpacity: 1 }} />
                <stop offset="35%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                <stop offset="70%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
              </linearGradient>
              <radialGradient id="highlight" cx="30%" cy="30%">
                <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
              </radialGradient>
            </defs>
            
            {/* Vase body increased width (scaled horizontally ~1.5x) */}
            <path
              d="M 75 10
                 C 60 10, 52.5 12, 52.5 15
                 C 52.5 18, 37.5 22, 22.5 30
                 C 7.5 38, 0 50, 0 70
                 C 0 90, 7.5 110, 22.5 125
                 C 33 135, 45 145, 52.5 150
                 C 57 153, 63 155, 75 155
                 C 87 155, 93 153, 97.5 150
                 C 105 145, 117 135, 127.5 125
                 C 142.5 110, 150 90, 150 70
                 C 150 50, 142.5 38, 127.5 30
                 C 112.5 22, 97.5 18, 97.5 15
                 C 97.5 12, 90 10, 75 10 Z"
              fill="url(#vaseGradient)"
              stroke="none"
            />
            
            {/* Glossy highlight */}
            <ellipse
              cx="45"
              cy="50"
              rx="37.5"
              ry="35"
              fill="url(#highlight)"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* Musical Note - Bottom Right */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-30">
        <button
          type="button"
          className={`cursor-pointer transition-transform duration-300 rounded-full p-4 lg:p-8 shadow-strong border border-purple-100 backdrop-blur-md ${
            isPlaying ? "bg-gradient-to-br from-white via-pink-100 to-purple-50 scale-110" : "bg-white/90 hover:scale-105"
          }`}
          onClick={toggleMusic}
          title={isPlaying ? "Click to pause music" : "Click to play music"}
        >
          {/* Default size for small screens, doubled on large screens via lg: classes */}
          <div className="relative w-16 h-16 flex items-center justify-center text-4xl text-gray-700 lg:w-24 lg:h-24 lg:text-8xl">
            {isPlaying ? (
              <div className="relative">
              <div
                  className="absolute -bottom-9 -left-5 animate-pulse"
                  style={{ transform: "scale(0.45)", transformOrigin: "center" }}
                >
                  ♫
                </div>
                <div className="animate-musical-bounce">🎶</div>
                <div
                  className="absolute -top-8 -right-4 animate-pulse"
                  style={{ transform: "scale(0.45)", transformOrigin: "center" }}
                >
                  ♪
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="">🎵🎼</div>
              </div>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default FloatingElements;

FloatingElements.propTypes = {
  isPlaying: PropTypes.bool,
  setIsPlaying: PropTypes.func,
  setVasePosition: PropTypes.func,
};