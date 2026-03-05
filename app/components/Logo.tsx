import React from 'react';
import { Zap } from 'lucide-react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 font-display font-bold text-2xl tracking-tight ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 bg-brand-primary rounded-xl overflow-hidden shadow-lg shadow-brand-secondary/20">
        {/* Stylized light beam/scan line */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary to-brand-primary opacity-20" />
        <div className="relative z-10 text-white">
          <Zap size={20} className="fill-brand-accent text-brand-accent" />
        </div>
        {/* Scan line animation effect */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-brand-accent/50 animate-[scan_3s_ease-in-out_infinite]" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-brand-primary">Lumen</span>
        <span className="text-brand-secondary text-sm font-medium tracking-widest uppercase">Health</span>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 1; }
        }
      `}} />
    </div>
  );
};
