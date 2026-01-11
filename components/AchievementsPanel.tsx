
import React from 'react';
import { MILESTONES } from '../constants';

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedIds: number[];
  currentXp: number;
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ isOpen, onClose, unlockedIds, currentXp }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all animate-in fade-in duration-300">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-2xl font-game font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-yellow-400 dark:to-orange-500">
            Achievements
          </h2>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MILESTONES.map((milestone) => {
            const isUnlocked = unlockedIds.includes(milestone.id);
            const progress = Math.min(100, (currentXp / milestone.xpRequired) * 100);

            return (
              <div 
                key={milestone.id}
                className={`
                  relative p-4 rounded-2xl border transition-all duration-300
                  ${isUnlocked 
                    ? `border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 shadow-sm` 
                    : 'border-slate-100 dark:border-slate-800/40 bg-white dark:bg-slate-950/40 opacity-60'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform
                    ${isUnlocked ? `${milestone.color} scale-100` : 'bg-slate-100 dark:bg-slate-800 scale-90'}
                  `}>
                    {isUnlocked ? milestone.badge : '🔒'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-bold ${isUnlocked ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                        {milestone.title}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500">
                        {milestone.xpRequired.toLocaleString()} XP
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {isUnlocked ? milestone.description : 'Keep tapping to manifest this badge.'}
                    </p>
                    
                    {!isUnlocked && (
                      <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {isUnlocked && (
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <svg className="w-3 h-3 text-[#32DE84] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-tighter">SYNCED</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Mastery: {unlockedIds.length} / {MILESTONES.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPanel;
