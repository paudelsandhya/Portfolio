import React from "react";
import { useNavigate } from "react-router-dom";

const ResumeBox = ({ open, toggle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/showcase");
  };

  return (
    <div className="relative">
      <div
        className="group rounded-[34px] p-[1px] bg-gradient-to-br from-indigo-300 via-white to-blue-100 shadow-strong cursor-pointer transition-all duration-500 h-56 hover:shadow-2xl"
        onClick={handleClick}
      >
        <div className="relative h-full rounded-[32px] overflow-hidden bg-white/95 border border-white/70 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),transparent_60%)] opacity-80"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
                showcase
              </div>
              <div className="text-xl">📦</div>
            </div>
            <h2 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Showcase</h2>
            <p className="text-sm text-indigo-500 uppercase tracking-[0.4em] mt-1">
              click to explore
            </p>

            <div className="text-center text-indigo-600 opacity-90 mt-8">
              <div className="text-5xl mb-2 animate-bounce">👆🏻</div>
              <div className="text-sm font-semibold tracking-wide">View Resume & Certificates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBox;