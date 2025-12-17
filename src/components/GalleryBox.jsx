import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GalleryBox = ({ open, toggle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to Gallery page on all screen sizes
    navigate("/Gallery");
  };

  return (
    <div className="relative">
      <div
        className="group rounded-[34px] p-[1px] bg-gradient-to-br from-purple-300 via-white to-purple-100 shadow-strong cursor-pointer transition-all duration-500 h-auto"
        onClick={handleClick}
      >
        <div className="relative h-full rounded-[32px] overflow-hidden bg-white/95 border border-white/70 transition-all duration-500 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(147,51,234,0.12),transparent_60%)] opacity-90"></div>
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-purple-100/80 to-transparent"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"></span>
                gallery
              </div>
              <div className="text-xl">🖼️</div>
            </div>
            <h2 className="text-3xl font-extrabold text-purple-900 tracking-tight">Blogs & Artworks</h2>
            <p className="text-sm text-purple-500 uppercase tracking-[0.4em] mt-1">
              click to explore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryBox;
