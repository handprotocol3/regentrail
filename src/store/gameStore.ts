import { create } from 'zustand';
import { toast } from 'sonner';
import { Points, Plant, Project, StoreItem } from '../types/game';
import { gardenPlants } from '../data/garden';
import { dojoSkills } from '../data/dojo';
import { featuredProjects } from '../data/projects';

interface GameState {
  points: Points;
  currentLocation: string;
  handBalance: {
    balance: number;
    donated: number;
  };
  wallet: {
    balances: Record<string, number>;
  };
  walletConnected: boolean;
  walletAddress: string;
  gardenPlots: Array<{ plant: Plant | null; growth: number }>;
  logs: string[];
  skills: Array<{ id: string; level: number; experience: number }>;
  inventory: StoreItem[];
  donationRound: number;
  completedActivities: Record<string, string[]>;

  // Actions
  addPoints: (points: Partial<Points>) => void;
  setLocation: (locationId: string) => void;
  addHand: (amount: number) => void;
  donateHand: (amount: number) => void;
  connectWallet: () => void;
  plantSeed: (plotIndex: number) => void;
  waterPlant: (plotIndex: number) => void;
  donateToProject: (projectId: string, amount: number) => Promise<void>;
  trainSkill: (skillId: string) => void;
  addLog: (message: string) => void;
  purchaseItem: (item: StoreItem) => void;
  addGloDollars: (amount: number) => void;
  completeDonationRound: () => void;
  markActivityComplete: (locationId: string, activityId: string) => void;
  isActivityCompleted: (locationId: string, activityId: string) => boolean;
}

export const useGameStore = create<GameState>((set) => ({
  points: {
    earth: 0,
    space: 0,
    hand: 0,
    carbon: 0
  },
  currentLocation: 'ethdenver',
  handBalance: {
    balance: 100,
    donated: 0
  },
  wallet: {
    balances: { 
      REGEN: 1000,
      USDGLO: 0
    }
  },
  walletConnected: false,
  walletAddress: '',
  gardenPlots: Array(6).fill({ plant: null, growth: 0 }),
  logs: ['Welcome to Regen Trail! Your regenerative journey begins...'],
  skills: dojoSkills.map(skill => ({ id: skill.id, level: 0, experience: 0 })),
  inventory: [],
  donationRound: 0,
  completedActivities: {},

  addLog: (message) => set((state) => ({
    logs: [...state.logs, message]
  })),

  addPoints: (points) => set((state) => ({
    points: Object.entries(points).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: (acc[key as keyof Points] || 0) + (value || 0)
      }),
      { ...state.points }
    )
  })),

  setLocation: (locationId) => set((state) => {
    state.addLog(`Traveling to ${locationId}...`);
    return { currentLocation: locationId };
  }),

  addHand: (amount) => set((state) => ({
    handBalance: {
      ...state.handBalance,
      balance: state.handBalance.balance + amount
    },
    logs: [...state.logs, `Earned ${amount} HAND token!`]
  })),

  donateHand: (amount) => set((state) => {
    if (state.handBalance.balance < amount) {
      toast.error('Not enough HAND tokens!');
      return state;
    }

    return {
      handBalance: {
        balance: state.handBalance.balance - amount,
        donated: state.handBalance.donated + amount
      },
      points: {
        ...state.points,
        hand: state.points.hand + Math.floor(amount / 10)
      },
      logs: [...state.logs, `Lent ${amount} HAND tokens to the community!`]
    };
  }),

  connectWallet: () => set((state) => {
    if (state.walletConnected) return state;
    
    const address = '0x' + Math.random().toString(16).slice(2, 14);
    return {
      walletConnected: true,
      walletAddress: address,
      logs: [...state.logs, `Connected wallet ${address}`]
    };
  }),

  plantSeed: (plotIndex) => set((state) => {
    if (state.handBalance.balance < 10) {
      toast.error('Not enough HAND tokens! Need 10 🖐️ to plant');
      return state;
    }

    const availablePlants = gardenPlants;
    const randomPlant = availablePlants[Math.floor(Math.random() * availablePlants.length)];

    const newPlots = [...state.gardenPlots];
    newPlots[plotIndex] = { plant: randomPlant, growth: 0 };

    return {
      gardenPlots: newPlots,
      handBalance: {
        ...state.handBalance,
        balance: state.handBalance.balance - 10
      },
      points: {
        ...state.points,
        earth: state.points.earth + 5,
        hand: state.points.hand + 3
      },
      logs: [...state.logs, `Planted ${randomPlant.name} in plot ${plotIndex + 1}`]
    };
  }),

  waterPlant: (plotIndex) => set((state) => {
    const plot = state.gardenPlots[plotIndex];
    if (!plot.plant) return state;

    if (state.handBalance.balance < 5) {
      toast.error('Not enough HAND tokens! Need 5 🖐️ to water');
      return state;
    }

    const newGrowth = Math.min(1, plot.growth + plot.plant.growthRate);
    const newPlots = [...state.gardenPlots];
    newPlots[plotIndex] = { ...plot, growth: newGrowth };

    if (newGrowth >= 1) {
      const earnedPoints = plot.plant.points;
      toast.success(`${plot.plant.name} fully grown!`, {
        description: `Earned ${Object.entries(earnedPoints)
          .map(([key, value]) => `${value} ${key}`)
          .join(', ')}`
      });

      newPlots[plotIndex] = { plant: null, growth: 0 };

      return {
        gardenPlots: newPlots,
        handBalance: {
          ...state.handBalance,
          balance: state.handBalance.balance - 5 + 20 // Cost 5 to water but earn 20 for harvest
        },
        points: Object.entries(earnedPoints).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: acc[key as keyof Points] + (value || 0)
          }),
          { ...state.points }
        ),
        logs: [...state.logs, `Harvested fully grown ${plot.plant.name}!`]
      };
    }

    return { 
      gardenPlots: newPlots,
      handBalance: {
        ...state.handBalance,
        balance: state.handBalance.balance - 5
      },
      logs: [...state.logs, `Watered ${plot.plant.name} in plot ${plotIndex + 1}`]
    };
  }),

  trainSkill: (skillId) => set((state) => {
    const skill = dojoSkills.find(s => s.id === skillId);
    if (!skill) return state;

    if (state.handBalance.balance < skill.cost) {
      toast.error('Not enough HAND tokens!');
      return state;
    }

    const userSkill = state.skills.find(s => s.id === skillId);
    if (!userSkill || userSkill.level >= 10) {
      toast.error('Skill already mastered!');
      return state;
    }

    const newExperience = userSkill.experience + 1;
    const levelUp = newExperience >= (userSkill.level + 1);

    const newSkills = state.skills.map(s => {
      if (s.id !== skillId) return s;
      return {
        ...s,
        level: levelUp ? s.level + 1 : s.level,
        experience: levelUp ? 0 : newExperience
      };
    });

    if (levelUp) {
      toast.success(`${skill.name} leveled up!`, {
        description: `Reached level ${userSkill.level + 1}`
      });
    }

    return {
      skills: newSkills,
      handBalance: {
        ...state.handBalance,
        balance: state.handBalance.balance - skill.cost
      },
      points: Object.entries(skill.points).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: acc[key as keyof Points] + (value || 0)
        }),
        { ...state.points }
      ),
      logs: [...state.logs, `Training ${skill.name}... ${levelUp ? 'Level up!' : ''}`]
    };
  }),

  purchaseItem: (item) => set((state) => {
    if (state.handBalance.balance < item.cost) {
      toast.error('Not enough HAND tokens!');
      return state;
    }

    return {
      handBalance: {
        ...state.handBalance,
        balance: state.handBalance.balance - item.cost
      },
      inventory: [...state.inventory, item],
      points: Object.entries(item.points).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: acc[key as keyof Points] + (value || 0)
        }),
        { ...state.points }
      ),
      logs: [...state.logs, `Purchased ${item.name} from the store!`]
    };
  }),

  donateToProject: async (projectId, amount) => {
    const project = featuredProjects.find(p => p.id === projectId);
    if (!project) return;

    set((state) => ({
      wallet: {
        ...state.wallet,
        balances: {
          ...state.wallet.balances,
          REGEN: state.wallet.balances.REGEN - amount
        }
      },
      points: {
        ...state.points,
        hand: state.points.hand + Math.floor(amount / 10),
        earth: state.points.earth + Math.floor(amount / 20)
      },
      logs: [...state.logs, `Donated ${amount} REGEN to ${project.name}`]
    }));

    const event = new CustomEvent('donation', { 
      detail: { amount, projectId } 
    });
    window.dispatchEvent(event);

    toast.success(`Donated ${amount} REGEN to ${project.name}!`, {
      description: 'Thank you for supporting regenerative projects!'
    });
  },

  addGloDollars: (amount) => set((state) => ({
    wallet: {
      ...state.wallet,
      balances: {
        ...state.wallet.balances,
        USDGLO: (state.wallet.balances.USDGLO || 0) + amount
      }
    }
  })),

  completeDonationRound: () => set((state) => ({
    donationRound: state.donationRound + 1
  })),

  markActivityComplete: (locationId, activityId) => set((state) => ({
    completedActivities: {
      ...state.completedActivities,
      [locationId]: [...(state.completedActivities[locationId] || []), activityId]
    }
  })),

  isActivityCompleted: (locationId, activityId) => (state) => {
    return state.completedActivities[locationId]?.includes(activityId) || false;
  }
}));