
import React from 'react';

interface XPDisplayProps {
  xp: number;
  multiplier: number;
}

const XPDisplay: React.FC<XPDisplayProps> = ({ xp, multiplier }) => {
  return (
    <div className="w-full pt-12 flex flex-col items-center z-10">
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl flex flex-col items-center transition-colors">
        <span className="text-indigo-600 dark:text-indigo-400 text-[10px] font-game font-bold uppercase tracking-[0.3em] mb-2 opacity-80">Spectral Power</span>
        <div className="flex items-baseline gap-3">
          <span className="text-5xl md:text-7xl font-game font-bold text-slate-900 dark:text-white tracking-tighter">
            {Math.floor(xp).toLocaleString()}
          </span>
          <span className="text-xl font-game text-indigo-500 font-bold">XP</span>
        </div>
        
        <div className="mt-4 flex gap-2">
           <div className="px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/30">
            <span className="text-indigo-600 dark:text-indigo-400 text-[10px] font-game font-bold uppercase tracking-widest">POWER: x{multiplier.toFixed(1)}</span>
          </div>
          {multiplier > 1.5 && (
            <div className="px-4 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/30 animate-pulse">
              <span className="text-orange-600 dark:text-orange-400 text-[10px] font-game font-bold uppercase tracking-widest">HAUNTING MODE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default XPDisplay;
