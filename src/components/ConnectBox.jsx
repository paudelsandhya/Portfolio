import { Facebook, Instagram, Mail } from "lucide-react";
import PropTypes from 'prop-types';

const ConnectBox = ({ open, toggle }) => {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/shyxn",
      icon: Facebook,
      color: "from-blue-600 to-blue-700"
    },
    {
      name: "Instagram", 
      url: "https://www.instagram.com/sandhyayaps/",
      icon: Instagram,
      color: "from-pink-600 to-purple-600"
    }
  ];

  const handleSocialClick = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = (e, email) => {
    e.stopPropagation();
    window.location.href = `mailto:${email}`;
  };



  return (
    <div className="relative">
      <div
        className={`group rounded-[34px] p-[1px] bg-gradient-to-br from-purple-300 via-white to-purple-100 shadow-strong cursor-pointer transition-all duration-500 ${
          open ? "min-h-96" : "h-56"
        }`}
        onClick={toggle}
      >
        <div
          className={`relative h-full rounded-[32px] overflow-hidden bg-white/95 border border-white/70 transition-all duration-500 ${
            open ? "shadow-2xl" : "shadow-lg"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(147,51,234,0.12),transparent_60%)] opacity-90"></div>
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-purple-100/80 to-transparent"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"></span>
                connect
              </div>
              <div className="text-xl">📦</div>
            </div>
            <h2 className="text-3xl font-extrabold text-purple-900 tracking-tight">Connect</h2>
            <p className="text-sm text-purple-500 uppercase tracking-[0.4em] mt-1">
              tap to unwrap
            </p>

            {open ? (
              <div className="mt-6 text-purple-800 space-y-5 animate-fadeIn">
                <div className="grid grid-cols-1 gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <button
                        key={social.name}
                        onClick={(e) => handleSocialClick(e, social.url)}
                        className="flex items-center justify-between rounded-2xl border border-purple-100 bg-white/80 px-4 py-3 shadow-soft hover:-translate-y-1 transition-transform duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100">
                            <IconComponent size={18} className="text-purple-600" />
                          </span>
                          <span className="text-sm font-semibold">{social.name}</span>
                        </div>
                        <span className="text-xs uppercase tracking-[0.3em] text-purple-400">visit</span>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-3xl bg-purple-50/70 border border-purple-100 p-4 shadow-soft space-y-3">
                  <h3 className="text-center text-xs uppercase tracking-[0.4em] text-purple-500">
                    Contact Info
                  </h3>
                  <button
                    onClick={(e) => handleEmailClick(e, "sandhyaxdxdxd@gmail.com")}
                    className="flex items-center gap-3 bg-white/80 rounded-2xl px-3 py-2 text-sm hover:bg-white transition-colors"
                  >
                    <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Mail size={14} />
                    </span>
                    paudelsandhya9b@gmail.com
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-purple-600 opacity-90 mt-8">
                <div className="text-5xl mb-2 animate-bounce">👆🏻</div>
                <div className="text-sm font-semibold tracking-wide">Tap for links</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectBox;

ConnectBox.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
};