import React from "react";

const Header = ({ letterOpen, setLetterOpen }) => {
  return (
    <>
      {/* Separate Header Background Section */}
      <div className="fixed top-0 left-0 right-0 h-32 md:h-40 bg-[#FFC5D3] z-10"></div>

      {/* Header Content */}
      <div className="fixed top-0 left-0 right-0 p-4 md:p-6 z-30 h-32 md:h-40 pointer-events-none">
        <div className="flex items-center justify-between h-full">
          {/* Profile Picture - Top Left */}
          <div className="relative z-40 pointer-events-auto">
            <div className="w-28 h-28 md:w-28 md:h-38 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white/70 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
              <img
                src="/Portfolio/assets/ProfilePicture.jpg"
                alt="Sandhya Paudel"
                className="w-full h-full object-cover animate-rotate-gentle"
                onError={(e) => {
                  console.log('Image failed to load');
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-4xl md:text-5xl">👤</div>';
                }}
              />
            </div>
            {/* Optional subtle animation ring */}
            <div className="absolute -inset-1 md:-inset-2 rounded-full bg-gradient-to-r from-pink-200 to-purple-200 opacity-40 animate-pulse -z-10"></div>
          </div>
          
          {/* Interactive Envelope Letter */}
          <div
            className={`transition-all duration-700 cursor-pointer transform hover:scale-105 pointer-events-auto ${
              letterOpen
                ? "fixed md:relative top-20 md:top-6 left-2 md:left-0 right-2 md:right-0 bg-white/95 md:bg-white/90 p-4 md:p-6 rounded-3xl shadow-2xl border-2 border-pink-200 backdrop-blur-sm z-50 text-xs md:text-base min-w-0 md:min-w-80 max-w-none md:max-w-md animate-envelope-open"
                : "relative bg-white/80 px-4 py-3 md:px-6 md:py-4 rounded-3xl shadow-2xl border border-pink-100 backdrop-blur-sm z-40 animate-letter-float"
            }`}
            onClick={() => setLetterOpen(!letterOpen)}
          >
            {letterOpen ? (
              <div className="text-pink-800 relative">
                {/* Envelope opened state */}
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 text-base md:text-2xl opacity-70">
                  ✉️
                </div>
                <div className="text-center space-y-1 md:space-y-3">
                  <div className="text-xs md:text-xl font-bold text-pink-700 border-b border-pink-200 pb-1 md:pb-2">
                    💌 A Message From Me
                  </div>
                  <p className="text-xs md:text-lg font-medium">Hi! I'm Sandhya Paudel.</p>
                  <p className="text-xs md:text-base text-pink-600">Welcome to my portfolio ✨</p>
                  <p className="text-xs md:text-sm text-pink-300 italic">Click again to close</p>
                  <p className="text-xs md:text-sm text-pink-300 italic">
                    <a
                      href="https://github.com/paudelsandhya/Portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-300 hover:underline"
                    >
                      Source Code
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-1">
                <div className="text-6xl md:text-8xl drop-shadow-xl" title="Click to read my message">
                  💌
                </div>
                <div className="text-xs md:text-sm text-pink-600 font-semibold tracking-widest uppercase">
                  Click me!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;