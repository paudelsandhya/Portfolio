import { Facebook, Instagram, Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const ConnectBox = ({ open, toggle }) => {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/sandhyayaps/",
      icon: Instagram,
      brandColor: "text-pink-600"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/shyxn",
      icon: Facebook,
      brandColor: "text-blue-600"
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/sandhya-paudel-823215394/",
      icon: Linkedin,
      brandColor: "text-blue-700"
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

  const handleGithubClick = (e) => {
    e.stopPropagation();
    window.open('https://github.com/paudelsandhya/Portfolio', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div
        className="group glass-card-strong rounded-[34px] transition-all duration-500 h-auto lg:min-h-0 cursor-pointer lg:cursor-default"
        style={{ backgroundColor: '#f5e4dc' }}
        onClick={toggle}
      >
        <div className="relative h-full rounded-[32px] overflow-hidden p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-grey-crimson/70">
              <span className="w-2 h-2 rounded-full bg-grey-crimson inline-block"></span>
              connect
            </div>
            {/* Globe emoji — clickable only on desktop */}
            <div
              className="text-xl hidden lg:block cursor-pointer hover:scale-125 transition-transform duration-200"
              onClick={handleGithubClick}
              title="View source code"
            >
              🌐
            </div>
            {/* Globe emoji — non-clickable on mobile */}
            <div className="text-xl lg:hidden">🌐</div>
          </div>
          <h2 className="text-3xl font-bold text-grey-crimson tracking-tight">Reach out to me</h2>
          <p className="text-sm text-grey-crimson/70 uppercase tracking-[0.4em] mt-1 lg:hidden">
            click to explore
          </p>

          {/* Mobile: conditional rendering */}
          {open ? (
            <div className="mt-6 space-y-4 animate-fadeIn lg:hidden">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={(e) => handleSocialClick(e, social.url)}
                    className="flex items-center justify-between glass-card rounded-2xl px-4 py-3 hover:-translate-y-1 transition-all duration-300 w-full"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent size={20} className={social.brandColor} />
                      <span className="text-sm font-bold text-grey-crimson">{social.name}</span>
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-grey-crimson/60">visit</span>
                  </button>
                );
              })}

              <div className="glass-card rounded-3xl p-4 space-y-3">
                <h3 className="text-center text-xs uppercase tracking-[0.4em] text-grey-crimson/70">
                  Mail me at:
                </h3>
                <button
                  onClick={(e) => handleEmailClick(e, "paudelsandhya9b@gmail.com")}
                  className="flex items-center gap-3 glass-card rounded-2xl px-3 py-2 text-sm hover:bg-white/20 transition-colors w-full"
                >
                  <Mail size={16} className="text-grey-crimson" />
                  <span className="text-grey-crimson">paudelsandhya9b@gmail.com</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-grey-crimson/60 opacity-90 mt-8 lg:hidden">
            </div>
          )}

          {/* Desktop: always show content */}
          <div className="hidden lg:block mt-6 space-y-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <button
                  key={social.name}
                  onClick={(e) => handleSocialClick(e, social.url)}
                  className="flex items-center justify-between glass-card rounded-2xl px-4 py-3 hover:-translate-y-1 transition-all duration-300 w-full"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent size={20} className={social.brandColor} />
                    <span className="text-sm font-bold text-grey-crimson">{social.name}</span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-grey-crimson/60">visit</span>
                </button>
              );
            })}

            <div className="glass-card rounded-3xl p-4 space-y-3">
              <h3 className="text-center text-xs uppercase tracking-[0.4em] text-grey-crimson/70">
                Mail me at:
              </h3>
              <button
                onClick={(e) => handleEmailClick(e, "paudelsandhya9b@gmail.com")}
                className="flex items-center gap-3 glass-card rounded-2xl px-3 py-2 text-sm hover:bg-white/20 transition-colors w-full"
              >
                <Mail size={16} className="text-grey-crimson" />
                <span className="text-grey-crimson">paudelsandhya9b@gmail.com</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectBox;

ConnectBox.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
};