
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { MILESTONES, UPGRADES, SAVE_KEY, BOOST_DURATION_MS, BOOST_COOLDOWN_MS } from './constants';
import { GameState, Milestone, Upgrade } from './types';
import GhostButton from './components/GhostButton';
import XPDisplay from './components/XPDisplay';
import BoostButton from './components/BoostButton';
import AchievementsPanel from './components/AchievementsPanel';
import UpgradesPanel from './components/UpgradesPanel';
import MilestoneToast from './components/MilestoneToast';
import InfoModal from './components/InfoModal';
import PlayGamesModal from './components/PlayGamesModal';
import { soundManager } from './utils/sounds';

const App: React.FC = () => {
  const [xp, setXp] = useState<number>(0);
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [unlockedMilestones, setUnlockedMilestones] = useState<number[]>([]);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<string[]>([]);
  const [isLinked, setIsLinked] = useState(false);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const [boostCooldown, setBoostCooldown] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPlayOpen, setIsPlayOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [activeToast, setActiveToast] = useState<Milestone | null>(null);
  
  const hapticRef = useRef<(pattern: number | number[]) => void>(() => {});

  useEffect(() => {
    hapticRef.current = (pattern: number | number[]) => {
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    };
  }, []);

  // System Theme Sync
  useEffect(() => {
    const handleTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    handleTheme(query);
    query.addEventListener('change', handleTheme);
    return () => query.removeEventListener('change', handleTheme);
  }, []);

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const parsed: GameState = JSON.parse(saved);
        setXp(parsed.xp || 0);
        setTotalClicks(parsed.totalClicks || 0);
        setUnlockedMilestones(parsed.unlockedMilestones || []);
        setPurchasedUpgrades(parsed.purchasedUpgrades || []);
        setIsLinked(!!parsed.isLinked);
      } catch (e) {
        console.error("Failed to load save", e);
      }
    }
  }, []);

  // Save Data
  useEffect(() => {
    const state: GameState = {
      xp,
      totalClicks,
      unlockedMilestones,
      purchasedUpgrades,
      isLinked,
      lastSave: Date.now()
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }, [xp, totalClicks, unlockedMilestones, purchasedUpgrades, isLinked]);

  // Calculate Base Power
  const clickPower = useMemo(() => {
    const bonus = purchasedUpgrades.reduce((acc, id) => {
      const upgrade = UPGRADES.find(u => u.id === id);
      return acc + (upgrade?.multiplierAdd || 0);
    }, 0);
    return 1 + bonus;
  }, [purchasedUpgrades]);

  // Milestone Check
  useEffect(() => {
    const newlyUnlocked = MILESTONES.find(m => xp >= m.xpRequired && !unlockedMilestones.includes(m.id));
    if (newlyUnlocked) {
      setUnlockedMilestones(prev => [...prev, newlyUnlocked.id]);
      setActiveToast(newlyUnlocked);
      soundManager.playMilestone();
      hapticRef.current(150);
    }
  }, [xp, unlockedMilestones]);

  const handleTap = useCallback(() => {
    const gain = isBoostActive ? clickPower * 2 : clickPower;
    setXp(prev => prev + gain);
    setTotalClicks(prev => prev + 1);
    soundManager.playTap();
  }, [isBoostActive, clickPower]);

  const activateBoost = useCallback(() => {
    if (Date.now() < boostCooldown || isBoostActive) return;

    setIsBoostActive(true);
    setBoostCooldown(Date.now() + BOOST_DURATION_MS + BOOST_COOLDOWN_MS);
    soundManager.playBoost();
    hapticRef.current([60, 40, 60]);

    setTimeout(() => {
      setIsBoostActive(false);
    }, BOOST_DURATION_MS);
  }, [boostCooldown, isBoostActive]);

  const handleUpgradePurchase = (upgrade: Upgrade) => {
    if (xp >= upgrade.cost && !purchasedUpgrades.includes(upgrade.id)) {
      setXp(prev => prev - upgrade.cost);
      setPurchasedUpgrades(prev => [...prev, upgrade.id]);
      soundManager.playBoost(); // Use boost sound for success
      hapticRef.current(100);
    }
  };

  const toggleMute = () => {
    const newMuteStatus = !isMuted;
    setIsMuted(newMuteStatus);
    soundManager.setMuted(newMuteStatus);
  };

  const handleLink = (name: string) => {
    setIsLinked(true);
    hapticRef.current(50);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-slate-50 dark:bg-[#08091a] text-slate-900 dark:text-white transition-colors duration-500">
      <XPDisplay xp={xp} multiplier={isBoostActive ? clickPower * 2 : clickPower} />

      {/* Navigation Buttons Container */}
      <div className="absolute top-6 left-6 right-6 flex justify-between z-20">
        <div className="flex gap-2">
          {/* Info Button */}
          <button 
            onClick={() => setIsInfoOpen(true)}
            className="p-3 bg-white/40 dark:bg-white/5 rounded-2xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Play Games Button */}
          <button 
            onClick={() => setIsPlayOpen(true)}
            className={`p-3 rounded-2xl transition-all border backdrop-blur-md flex items-center gap-2 ${isLinked ? 'bg-[#32DE84]/20 border-[#32DE84]/50 text-[#32DE84]' : 'bg-white/40 dark:bg-white/5 border-slate-200 dark:border-white/10 text-zinc-500'}`}
          >
            <svg className={`h-6 w-6 fill-current ${isLinked ? 'text-[#32DE84]' : 'text-zinc-500 dark:text-zinc-400'}`} viewBox="0 0 24 24">
              <path d="M21.58,16.09L11.01,2.48c-0.38-0.51-1.21-0.51-1.6,0L3.43,15.48c-0.43,0.56-0.26,1.41,0.38,1.63l2.49,0.86 c0.31,0.11,0.65,0.01,0.86-0.25l1.62-2.03c0.23-0.29,0.68-0.29,0.91,0l1.62,2.03c0.2,0.26,0.55,0.36,0.86,0.25l2.49-0.86 C21.84,17.5,22.01,16.65,21.58,16.09z"/>
            </svg>
          </button>
        </div>

        <div className="flex gap-2">
          {/* Spectral Lab Button */}
          <button 
            onClick={() => {
              setIsLabOpen(true);
              hapticRef.current(20);
            }}
            className="p-3 bg-white/40 dark:bg-white/5 rounded-2xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.506.326l-1.42-.284a2 2 0 11.795-3.92l1.422.284a4 4 0 002.506-.326l.672-.337a6 6 0 013.86-.517l2.387.477a2 2 0 001.022.547l.533.107a2 2 0 011.916 2.085l-.045.311a2 2 0 01-1.961 1.714H18.5a2 2 0 01-1.916-2.085l.045-.311a2 2 0 011.961-1.714h.045z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4.717V4a1 1 0 011-1h0a1 1 0 011 1v.717a2 2 0 01-1 1.732l-2 1.155a2 2 0 00-1 1.732v1.378" />
            </svg>
          </button>

          {/* Sound Toggle Button */}
          <button 
            onClick={toggleMute}
            className="p-3 bg-white/40 dark:bg-white/5 rounded-2xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10 backdrop-blur-md"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Achievements Menu Button */}
          <button 
            onClick={() => {
              setIsMenuOpen(true);
              hapticRef.current(20);
            }}
            className="p-3 bg-white/40 dark:bg-white/5 rounded-2xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        <GhostButton onTab={handleTap} isBoosted={isBoostActive} />
      </div>

      <div className="w-full px-8 pb-12 flex flex-col items-center gap-6">
        <BoostButton 
          onActivate={activateBoost} 
          isActive={isBoostActive} 
          cooldownEnd={boostCooldown} 
        />
        
        <p className="text-slate-500 dark:text-slate-500 text-[10px] font-game font-semibold uppercase tracking-widest opacity-80 flex items-center gap-2">
          Ghost Spectre v1.5 • Haunts: {totalClicks.toLocaleString()}
          {isLinked && <span className="text-[#32DE84]">● Cloud Active</span>}
        </p>
      </div>

      <AchievementsPanel 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        unlockedIds={unlockedMilestones}
        currentXp={xp}
      />

      <UpgradesPanel 
        isOpen={isLabOpen} 
        onClose={() => setIsLabOpen(false)} 
        purchasedIds={purchasedUpgrades}
        currentXp={xp}
        onPurchase={handleUpgradePurchase}
      />

      <InfoModal 
        isOpen={isInfoOpen} 
        onClose={() => setIsInfoOpen(false)} 
      />

      <PlayGamesModal 
        isOpen={isPlayOpen} 
        onClose={() => setIsPlayOpen(false)}
        isLinked={isLinked}
        onLink={handleLink}
        xp={xp}
      />

      {activeToast && (
        <MilestoneToast 
          milestone={activeToast} 
          onClose={() => setActiveToast(null)} 
        />
      )}

      {/* Floating spectral mist particles */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-indigo-300 dark:bg-indigo-200 blur-xl"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `spectral ${Math.random() * 20 + 10}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes spectral {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.1; }
          50% { transform: translate(100px, -100px) scale(1.5); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default App;
