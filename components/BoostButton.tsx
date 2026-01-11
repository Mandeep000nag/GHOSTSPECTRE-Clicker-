
import React, { useState, useEffect } from 'react';
import { BOOST_DURATION_MS, BOOST_COOLDOWN_MS } from '../constants';

interface BoostButtonProps {
  onActivate: () => void;
  isActive: boolean;
  cooldownEnd: number;
}

const BoostButton: React.FC<BoostButtonProps> = ({ onActivate, isActive, cooldownEnd }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, cooldownEnd - now);
      setTimeLeft(diff);
    }, 100);

    return () => clearInterval(timer);
  }, [cooldownEnd]);

  const progress = isActive 
    ? (timeLeft - BOOST_COOLDOWN_MS) / BOOST_DURATION_MS * 100 
    : timeLeft / BOOST_COOLDOWN_MS * 100;

  const isAvailable = timeLeft <= 0;

  return (
    <div className="w-full max-w-sm px-4">
      <button
        onClick={onActivate}
        disabled={!isAvailable}
        className={`
          relative w-full py-5 rounded-2xl font-game font-bold text-xl overflow-hidden transition-all
          ${isActive 
            ? 'boost-active text-white bg-orange-600' 
            : isAvailable 
              ? 'bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 dark:shadow-indigo-900/40' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'}
        `}
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          {isActive ? (
            <>
              <span>🔥 HAUNTING MODE</span>
              <span className="bg-white/20 px-2 rounded">x2</span>
            </>
          ) : isAvailable ? (
            <>
              <span>⚡ ACTIVATE BOOST</span>
              <span className="text-sm bg-white/20 px-2 rounded">x2</span>
            </>
          ) : (
            <span>RECHARGING... {Math.ceil(timeLeft / 1000)}s</span>
          )}
        </div>

        {/* Progress overlay */}
        {!isAvailable && (
          <div 
            className={`absolute top-0 left-0 h-full opacity-30 ${isActive ? 'bg-white' : 'bg-indigo-400 dark:bg-indigo-300'}`}
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        )}
      </button>
      
      {!isActive && isAvailable && (
        <div className="text-center mt-2">
          <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Tap the ghost for double experience</span>
        </div>
      )}
    </div>
  );
};

export default BoostButton;
