import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @keyframes heartbeat {
          0%   { transform: scale(1); }
          14%  { transform: scale(1.08); }
          28%  { transform: scale(1); }
          42%  { transform: scale(1.05); }
          70%  { transform: scale(1); }
          100% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
      `}</style>

      {/* Separate Header Background Section */}
      <div className="fixed top-0 left-0 right-0 h-32 md:h-40 backdrop-blur-sm z-10"></div>

      {/* Header Content */}
      <div className="fixed top-0 left-0 right-0 p-4 md:p-6 z-30 h-32 md:h-40 pointer-events-none">
        <div className="flex items-center justify-between h-full">
          {/* Profile Picture - Top Left — click to go home */}
          <div className="relative z-40 pointer-events-auto">
            <button
              onClick={() => navigate("/")}
              className="block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 cursor-pointer"
              aria-label="Go to home page"
            >
              <div className="w-28 h-28 md:w-28 md:h-38 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white/70 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white">
                <img
                  src={`${import.meta.env.BASE_URL}assets/Sandhya-Paudel_Profile-Picture.jpg`}
                  alt="Sandhya Paudel"
                  className="w-full h-full object-cover animate-heartbeat"
                  loading="eager"
                  fetchpriority="high"
                  onError={(e) => {
                    console.log('Image failed to load');
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-4xl md:text-5xl">👤</div>';
                  }}
                />
              </div>
            </button>
            {/* Subtle animation ring */}
            <div className="absolute -inset-1 md:-inset-2 rounded-full bg-gradient-to-r from-pink-200 to-purple-200 opacity-40 animate-pulse -z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;