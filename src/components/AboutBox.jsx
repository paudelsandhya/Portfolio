import React from "react";
import { useNavigate } from "react-router-dom";

const AboutBox = ({ open, toggle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to About page on all screen sizes
    navigate("/About");
  };

  return (
    <div className="relative">
      <div
        className="group rounded-[34px] p-[1px] bg-gradient-to-br from-pink-200 via-white to-pink-100 shadow-strong cursor-pointer transition-all duration-500 h-auto"
        onClick={handleClick}
      >
        <div className="relative h-full rounded-[32px] overflow-hidden bg-white/90 backdrop-blur-sm border border-white/70 transition-all duration-500 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.12),transparent_55%)] opacity-80"></div>
          <div className="absolute -top-5 -left-5 w-24 h-24 bg-pink-200/40 blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-200/30 blur-3xl"></div>

          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-pink-400">
                <span className="w-2 h-2 rounded-full bg-pink-400 inline-block"></span>
                profile
              </div>
              <div className="text-xl">🙋‍♀️</div>
            </div>
            <h2 className="text-3xl font-extrabold text-pink-800 tracking-tight drop-shadow-sm">
              About Me
            </h2>
            <p className="text-sm text-pink-500 uppercase tracking-[0.4em] mt-1">
              click to explore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBox;
