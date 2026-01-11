
import React from 'react';
import { UPGRADES } from '../constants';
import { Upgrade } from '../types';

interface UpgradesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  purchasedIds: string[];
  currentXp: number;
  onPurchase: (upgrade: Upgrade) => void;
}

const UpgradesPanel: React.FC<UpgradesPanelProps> = ({ isOpen, onClose, purchasedIds, currentXp, onPurchase }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-[0_0_50px_rgba(79,70,229,0.2)] flex flex-col max-h-[85vh] overflow-hidden text-white">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-indigo-900/40 to-transparent">
          <div>
            <h2 className="text-2xl font-game font-bold text-indigo-400">Spectral Lab</h2>
            <p className="text-[10px] font-game text-indigo-300/60 uppercase tracking-widest">Manifest Permanent Power</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Upgrade List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {UPGRADES.map((upgrade) => {
            const isPurchased = purchasedIds.includes(upgrade.id);
            const canAfford = currentXp >= upgrade.cost;

            return (
              <div 
                key={upgrade.id}
                className={`
                  p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between
                  ${isPurchased 
                    ? 'border-indigo-500/50 bg-indigo-500/10' 
                    : 'border-white/5 bg-white/5 hover:bg-white/10'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                    ${isPurchased ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}
                  `}>
                    {upgrade.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{upgrade.name}</h3>
                    <p className="text-[10px] text-slate-400 uppercase font-game">{upgrade.description}</p>
                  </div>
                </div>

                {isPurchased ? (
                  <div className="px-3 py-1 bg-indigo-500/20 rounded-full border border-indigo-500/40">
                    <span className="text-[10px] font-bold text-indigo-400">MANIFESTED</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onPurchase(upgrade)}
                    disabled={!canAfford}
                    className={`
                      px-4 py-2 rounded-xl font-game text-[10px] font-bold transition-all
                      ${canAfford 
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}
                    `}
                  >
                    {upgrade.cost.toLocaleString()} XP
                  </button>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Footer info */}
        <div className="p-4 bg-slate-950/80 border-t border-white/5 flex justify-between items-center">
          <div className="text-left">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Balance</p>
            <p className="text-lg font-game text-indigo-400">{currentXp.toLocaleString()} XP</p>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            {purchasedIds.length} / {UPGRADES.length} Upgrades
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradesPanel;
