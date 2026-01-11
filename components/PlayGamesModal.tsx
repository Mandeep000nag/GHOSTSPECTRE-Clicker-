
import React, { useState, useEffect } from 'react';

interface PlayGamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLinked: boolean;
  onLink: (name: string) => void;
  xp: number;
}

const PlayGamesModal: React.FC<PlayGamesModalProps> = ({ isOpen, onClose, isLinked, onLink, xp }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'leaderboard'>('profile');

  if (!isOpen) return null;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const mockLeaderboard = [
    { rank: 1, name: "GhostMaster_99", xp: 2500000 },
    { rank: 2, name: "Spectre_X", xp: 1800000 },
    { rank: 3, name: "ShadowStalker", xp: 1200000 },
    { rank: 4, name: "You", xp: xp, isUser: true },
    { rank: 5, name: "VoidWalker", xp: 950000 },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Play Games Header */}
        <div className="bg-[#32DE84] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/>
            </svg>
            <h2 className="text-xl font-bold text-white tracking-tight">Play Games</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 font-bold text-sm transition-colors ${activeTab === 'profile' ? 'text-[#32DE84] border-b-2 border-[#32DE84]' : 'text-zinc-500'}`}
          >
            PROFILE
          </button>
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-4 font-bold text-sm transition-colors ${activeTab === 'leaderboard' ? 'text-[#32DE84] border-b-2 border-[#32DE84]' : 'text-zinc-500'}`}
          >
            LEADERBOARD
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'profile' ? (
            <div className="flex flex-col items-center">
              {!isLinked ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">👤</div>
                  <h3 className="text-lg font-bold dark:text-white mb-2">Not Signed In</h3>
                  <p className="text-sm text-zinc-500 mb-8 px-4">Sign in with Google Play Games to sync your spectral XP across devices and compete globally.</p>
                  <button 
                    onClick={() => onLink("SpectreUser_" + Math.floor(Math.random() * 9000))}
                    className="w-full py-4 bg-[#32DE84] text-white font-bold rounded-2xl hover:bg-[#2bc475] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#32DE84]/20"
                  >
                    SIGN IN TO PLAY GAMES
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex items-center gap-4 mb-8 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-2xl">
                    <div className="w-16 h-16 bg-[#32DE84] rounded-full flex items-center justify-center text-2xl">👻</div>
                    <div>
                      <h3 className="font-bold dark:text-white">SpectrePlayer_942</h3>
                      <p className="text-xs text-[#32DE84] font-bold">LEVEL 42 SPECTRE</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleSync}
                      disabled={isSyncing}
                      className="w-full p-4 border border-zinc-200 dark:border-zinc-700 rounded-2xl flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xl ${isSyncing ? 'animate-spin' : ''}`}>🔄</span>
                        <div className="text-left">
                          <p className="text-xs font-bold text-zinc-400">CLOUD SYNC</p>
                          <p className="text-sm font-bold dark:text-white">{isSyncing ? 'Syncing...' : 'Status: Up to date'}</p>
                        </div>
                      </div>
                      <span className="text-zinc-400">➔</span>
                    </button>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[10px] font-bold text-blue-500 uppercase">Achievements Tracked</p>
                        <p className="text-xs font-bold text-blue-600">85%</p>
                      </div>
                      <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '85%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {mockLeaderboard.map((player) => (
                <div 
                  key={player.name} 
                  className={`flex items-center justify-between p-4 rounded-2xl border ${player.isUser ? 'bg-[#32DE84]/10 border-[#32DE84]' : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-6 text-center font-bold ${player.rank <= 3 ? 'text-amber-500' : 'text-zinc-400'}`}>#{player.rank}</span>
                    <div>
                      <p className={`font-bold text-sm ${player.isUser ? 'text-[#32DE84]' : 'dark:text-white'}`}>{player.name} {player.isUser && "(You)"}</p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{player.xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                  {player.rank === 1 && <span className="text-xl">🏆</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Google Play Games Integration • Secure Spectral Cloud</p>
        </div>
      </div>
    </div>
  );
};

export default PlayGamesModal;
