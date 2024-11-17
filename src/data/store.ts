import { StoreItem } from '../types/game';

export const storeItems: StoreItem[] = [
  {
    id: 'solar-synth',
    name: 'Solar Synthesizer',
    description: 'A sustainable synthesizer powered by solar energy',
    cost: 100,
    type: 'instrument',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&q=80&w=1920',
    points: { earth: 20, space: 10 },
    spaceRequired: 50
  },
  {
    id: 'bamboo-drum',
    name: 'Bamboo Drum Set',
    description: 'Eco-friendly percussion crafted from sustainable bamboo',
    cost: 80,
    type: 'instrument',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=1920',
    points: { earth: 15, hand: 15 },
    spaceRequired: 30
  },
  {
    id: 'portable-panel',
    name: 'Portable Solar Panel',
    description: 'Compact solar panel for mobile power generation',
    cost: 150,
    type: 'solar',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1920',
    points: { carbon: 25, space: 15 },
    spaceRequired: 75
  },
  {
    id: 'studio-mic',
    name: 'Eco Studio Microphone',
    description: 'Professional-grade microphone made from recycled materials',
    cost: 120,
    type: 'instrument',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=1920',
    points: { space: 20, hand: 20 },
    spaceRequired: 60
  }
];