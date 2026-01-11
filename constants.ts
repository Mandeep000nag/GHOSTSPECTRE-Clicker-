
import { Milestone, Upgrade } from './types';

export const MILESTONES: Milestone[] = [
  { id: 1, xpRequired: 1000, title: "Faint Whisper", badge: "👻", color: "bg-slate-400", description: "You are starting to manifest." },
  { id: 2, xpRequired: 5000, title: "Poltergeist", badge: "🏺", color: "bg-indigo-400", description: "Things are starting to move." },
  { id: 3, xpRequired: 10000, title: "Wraith Explorer", badge: "🕯️", color: "bg-purple-500", description: "A presence felt across the void." },
  { id: 4, xpRequired: 25000, title: "Spectral Stalker", badge: "👁️", color: "bg-violet-600", description: "Watching from the shadows." },
  { id: 5, xpRequired: 50000, title: "Phantom Lord", badge: "💀", color: "bg-fuchsia-600", description: "Commander of the afterlife." },
  { id: 6, xpRequired: 100000, title: "Ghost Spectre", badge: "✨", color: "bg-orange-500", description: "The true identity revealed." },
  { id: 7, xpRequired: 200000, title: "Eternal Soul", badge: "♾️", color: "bg-amber-500", description: "Time no longer matters." },
  { id: 8, xpRequired: 400000, title: "Void Master", badge: "🌑", color: "bg-rose-600", description: "The abyss stares back." },
  { id: 9, xpRequired: 700000, title: "Ethereal King", badge: "👑", color: "bg-red-600", description: "Ruling the spectral kingdom." },
  { id: 10, xpRequired: 1000000, title: "Spectre Legend", badge: "💎", color: "bg-yellow-400", description: "The ultimate haunting achievement." },
];

export const UPGRADES: Upgrade[] = [
  { id: 'u1', name: 'Ecto-Infusion', description: '+0.5 Click Power', cost: 500, multiplierAdd: 0.5, icon: '🧪' },
  { id: 'u2', name: 'Wraith Veil', description: '+1.0 Click Power', cost: 2500, multiplierAdd: 1.0, icon: '🌫️' },
  { id: 'u3', name: 'Phantom Echo', description: '+2.5 Click Power', cost: 12000, multiplierAdd: 2.5, icon: '📢' },
  { id: 'u4', name: 'Void Core', description: '+5.0 Click Power', cost: 50000, multiplierAdd: 5.0, icon: '⚛️' },
  { id: 'u5', name: 'Astral Crown', description: '+15.0 Click Power', cost: 200000, multiplierAdd: 15.0, icon: '👑' },
  { id: 'u6', name: 'Ethereal Singularity', description: '+50.0 Click Power', cost: 1000000, multiplierAdd: 50.0, icon: '🌌' },
];

export const BOOST_DURATION_MS = 10000;
export const BOOST_COOLDOWN_MS = 30000;
export const SAVE_KEY = "ghost_spectre_clicker_v2";
