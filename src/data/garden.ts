import { Plant } from '../types/game';

export const gardenPlants: Plant[] = [
  {
    id: 'bamboo',
    name: 'Bamboo',
    emoji: '🎋',
    growthRate: 0.1,
    points: { earth: 5, carbon: 3 }
  },
  {
    id: 'tree',
    name: 'Tree',
    emoji: '🌳',
    growthRate: 0.05,
    points: { earth: 10, carbon: 8 }
  },
  {
    id: 'flower',
    name: 'Flower',
    emoji: '🌸',
    growthRate: 0.15,
    points: { earth: 3, hand: 2 }
  }
];