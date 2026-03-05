import React from 'react';
export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative group">
        {/* Glow background to highlight the logo */}
        <div className="absolute -inset-2 bg-brand-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Logo image without background container */}
        <div className="relative flex items-center justify-center">
          <img
            src="/logo_azul.png"
            alt="Lumen Health Logo"
            className="h-10 sm:h-12 w-auto object-contain relative z-10 drop-shadow-[0_0_8px_rgba(15,23,42,0.6)] drop-shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};
