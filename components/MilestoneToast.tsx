
import React, { useEffect, useState } from 'react';
import { Milestone } from '../types';

interface MilestoneToastProps {
  milestone: Milestone;
  onClose: () => void;
}

const MilestoneToast: React.FC<MilestoneToastProps> = ({ milestone, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Wait for exit animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`
      fixed top-12 left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-500 ease-out
      ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-20 opacity-0 scale-90'}
      w-[90%] max-w-sm
    `}>
      <div className={`
        ${milestone.color} p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/20
        flex flex-col items-center text-center
      `}>
        <div className="text-6xl mb-4 animate-bounce">
          {milestone.badge}
        </div>
        <h3 className="text-xl font-game font-bold text-white mb-1 uppercase tracking-wider">
          New Milestone!
        </h3>
        <p className="text-2xl font-bold text-white/90 mb-2">
          {milestone.title}
        </p>
        <p className="text-sm text-white/70 italic">
          "{milestone.description}"
        </p>
        
        <div className="mt-4 px-4 py-2 bg-black/20 rounded-full text-xs font-bold text-white">
          UNLOCKED AT {milestone.xpRequired.toLocaleString()} XP
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MilestoneToast;
