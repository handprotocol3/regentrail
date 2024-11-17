import { Skill } from '../types/game';

export const dojoSkills: Skill[] = [
  {
    id: 'regenerative-design',
    name: 'Regenerative Design',
    description: 'Learn the principles of regenerative systems and holistic design',
    cost: 50,
    points: { earth: 15, hand: 10 }
  },
  {
    id: 'token-economics',
    name: 'Token Economics',
    description: 'Master the art of sustainable token economies and incentive design',
    cost: 75,
    points: { space: 20, carbon: 10 }
  },
  {
    id: 'community-building',
    name: 'Community Building',
    description: 'Develop skills in fostering regenerative communities',
    cost: 60,
    points: { hand: 25, earth: 5 }
  },
  {
    id: 'defi-mastery',
    name: 'DeFi Mastery',
    description: 'Learn advanced decentralized finance mechanisms',
    cost: 100,
    points: { space: 30, hand: 10 }
  }
];