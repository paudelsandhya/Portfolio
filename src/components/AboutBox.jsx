import React from "react";

const AboutBox = ({ open, toggle }) => {
  return (
    <div className="relative">
      <div
        className={`group rounded-[34px] p-[1px] bg-gradient-to-br from-pink-200 via-white to-pink-100 shadow-strong cursor-pointer transition-all duration-500 ${
          open ? "min-h-96" : "h-56"
        }`}
        onClick={toggle}
      >
        <div
          className={`relative h-full rounded-[32px] overflow-hidden bg-white/90 backdrop-blur-sm border border-white/70 transition-all duration-500 ${
            open ? "shadow-2xl" : "shadow-lg"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.12),transparent_55%)] opacity-80"></div>
          <div className="absolute -top-5 -left-5 w-24 h-24 bg-pink-200/40 blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-200/30 blur-3xl"></div>

          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-pink-400">
                <span className="w-2 h-2 rounded-full bg-pink-400 inline-block"></span>
                profile
              </div>
              <div className="text-xl">📦</div>
            </div>
            <h2 className="text-3xl font-extrabold text-pink-800 tracking-tight drop-shadow-sm">
              About Me
            </h2>
            <p className="text-sm text-pink-500 uppercase tracking-[0.4em] mt-1">
              open & explore
            </p>

            {open ? (
              <div className="mt-6 text-pink-800 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="rounded-2xl bg-white/80 border border-pink-100 p-3 shadow-soft">
                    <p className="text-lg font-semibold">Sandhya Paudel</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-pink-100 p-3 shadow-soft">
                    <p className="text-lg font-semibold">Student</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-pink-100 p-3 shadow-soft">
                    <p className="font-semibold text-xs text-pink-500 uppercase tracking-[0.2em] mb-1">Interests</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Writing</li>
                      <li>Biotechnology enthusiast</li>
                      <li>Counselling enthusiast</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-pink-100 p-3 shadow-soft">
                    <p className="font-semibold text-xs text-pink-500 uppercase tracking-[0.2em] mb-1">Experience</p>
                    <p className="text-lg font-semibold">UN Volunteer</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-pink-600 opacity-90 mt-8">
                <div className="text-5xl mb-2 animate-bounce">👆🏻</div>
                <div className="text-sm font-semibold tracking-wide">Tap to lift the lid</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBox;