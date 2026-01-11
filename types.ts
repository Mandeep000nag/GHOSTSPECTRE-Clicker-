
export interface Milestone {
  id: number;
  xpRequired: number;
  title: string;
  badge: string;
  color: string;
  description: string;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  multiplierAdd: number;
  icon: string;
}

export interface GameState {
  xp: number;
  totalClicks: number;
  unlockedMilestones: number[];
  purchasedUpgrades: string[];
  lastSave: number;
  isLinked?: boolean;
  playerName?: string;
}
