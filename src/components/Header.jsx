import React from "react";

const Header = () => {
  return (
    <>
      {/* Separate Header Background Section */}
      <div className="fixed top-0 left-0 right-0 h-32 md:h-40 backdrop-blur-sm z-10"></div>

      {/* Header Content */}
      <div className="fixed top-0 left-0 right-0 p-4 md:p-6 z-30 h-32 md:h-40 pointer-events-none">
        <div className="flex items-center justify-between h-full">
          {/* Profile Picture - Top Left */}
          <div className="relative z-40 pointer-events-auto">
            <div className="w-28 h-28 md:w-28 md:h-38 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white/70 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
              <img
                src={`${import.meta.env.BASE_URL}assets/Sandhya-Paudel_Profile-Picture.jpg`}
                alt="Sandhya Paudel"
                className="w-full h-full object-cover animate-breathe"
                loading="eager"
                fetchpriority="high"
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
        </div>
      </div>
    </>
  );
};

export default Header;