"use client";

import React from 'react';
import Image from 'next/image';
export const Logo = ({ className = "" }: { className?: string }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <a
      href="/"
      onClick={handleClick}
      className={`flex items-center cursor-pointer ${className}`}
    >
      <div className="relative group">
        {/* Glow background to highlight the logo */}
        <div className="absolute -inset-2 bg-brand-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Logo image without background container */}
        <div className="relative flex items-center justify-center">
          <Image
            src="/logo_azul.png"
            alt="Lumen Health Logo"
            height={64}
            width={240}
            className="h-14 sm:h-16 w-auto object-contain relative z-10 drop-shadow-[0_0_8px_rgba(15,23,42,0.6)] drop-shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-transform duration-300 group-hover:scale-105"
            priority
            fetchPriority="high"
          />
        </div>
      </div>
    </a>
  );
};
