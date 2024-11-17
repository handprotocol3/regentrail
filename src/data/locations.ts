import { Location } from '../types/game';

export const locations: Record<string, Location> = {
  ethdenver: {
    id: 'ethdenver',
    name: 'ETHDenver 2024',
    description: 'The premier Web3 innovation festival in the Rocky Mountains',
    image: 'https://images.unsplash.com/photo-1634507307799-ace9b49840b7?auto=format&fit=crop&q=80&w=1920',
    storyIntro: 'Welcome to the vibrant heart of blockchain innovation. The crisp mountain air carries whispers of revolutionary ideas as BUIDLers gather for the world\'s largest Web3 #BUIDLathon...',
    travelText: 'The Modal Motorcoach transforms into a snowmobile as we glide through the Rocky Mountains! ⛰️❄️',
    date: 'February 23 - March 2, 2024',
    activities: [
      {
        id: 'buidlweek',
        name: 'BUIDL Week',
        description: 'Join the pre-event workshops and hackathon preparation',
        rewards: ['🏗️', '💻'],
        points: { space: 30, hand: 20 },
        story: [
          'Arriving at the Sports Castle, you feel the electric energy of innovation...',
          'Fellow BUIDLers from around the world gather to shape the future...',
          'The workshops begin, each session unlocking new possibilities...'
        ]
      },
      {
        id: 'hackathon',
        name: 'ReFi Hackathon',
        description: 'Build regenerative solutions during the main hackathon',
        rewards: ['🌱', '🚀'],
        points: { earth: 50, space: 40 },
        story: [
          'Your team assembles in the hacker space, screens glowing with potential...',
          'Ideas flow as freely as the coffee, each line of code a step toward regeneration...',
          'The mentors provide guidance, helping shape your vision...'
        ]
      },
      {
        id: 'sporkdao',
        name: 'SporkDAO Dinner',
        description: 'Network with fellow regenerators over a community dinner',
        rewards: ['🍴', '🤝'],
        points: { hand: 25, earth: 15 },
        story: [
          'The aroma of locally-sourced food fills the air...',
          'Conversations spark between bites, new collaborations forming...',
          'The community strengthens with each shared meal...'
        ]
      }
    ],
    quests: [
      {
        id: 'eth-1',
        title: 'ReFi Innovation Challenge',
        description: 'Build a sustainable solution during the hackathon',
        points: { space: 50, carbon: 20 },
        completed: false,
        rewards: ['🚀', '💻'],
        story: 'Your code could be the key to unlocking a more sustainable future...',
        milestones: [
          'Form your team',
          'Submit project proposal',
          'Present to the judges'
        ]
      }
    ]
  },
  solarpunk: {
    id: 'solarpunk',
    name: 'SolarPunk Festival',
    description: 'A celebration of sustainable technology and optimistic futures',
    image: 'https://images.unsplash.com/photo-1465254596705-1ef61f93aa21?auto=format&fit=crop&q=80&w=1920',
    storyIntro: 'Welcome to a vibrant fusion of art, technology, and ecological harmony. Solar-powered stages pulse with music while innovators showcase a future where nature and technology dance in perfect balance...',
    travelText: 'The Modal Motorcoach transforms into a solar-powered hovercraft, gliding silently through fields of solar flowers! 🌻✨',
    date: 'September 21-23, 2024',
    activities: [
      {
        id: 'solarhack',
        name: 'Solar Hackathon',
        description: 'Build solar-powered gadgets and sustainable tech',
        rewards: ['☀️', '🔧'],
        points: { space: 40, earth: 30 },
        story: [
          'The solar lab hums with creative energy...',
          'Your team combines salvaged tech with cutting-edge solar cells...',
          'The prototype springs to life, powered by pure sunlight...'
        ]
      },
      {
        id: 'ecostage',
        name: 'Eco-Stage Performance',
        description: 'Experience music powered entirely by renewable energy',
        rewards: ['🎵', '⚡'],
        points: { earth: 25, hand: 35 },
        story: [
          'The stage\'s solar panels glisten in the setting sun...',
          'Musicians create harmony with nature\'s own rhythms...',
          'The crowd dances, powered by sustainable vibes...'
        ]
      },
      {
        id: 'futurefashion',
        name: 'Future Fashion Show',
        description: 'Showcase sustainable and tech-enhanced fashion',
        rewards: ['👔', '🌿'],
        points: { hand: 30, carbon: 20 },
        story: [
          'Models wear clothing that generates its own energy...',
          'Smart fabrics shimmer with collected solar power...',
          'The future of fashion reveals itself: sustainable and stunning...'
        ]
      }
    ],
    quests: [
      {
        id: 'solar-1',
        title: 'Solar Innovation Challenge',
        description: 'Create a solar-powered solution for daily life',
        points: { space: 45, earth: 35 },
        completed: false,
        rewards: ['☀️', '💡'],
        story: 'Your innovation could help bridge the gap between nature and technology...',
        milestones: [
          'Design solar solution',
          'Build prototype',
          'Demonstrate impact'
        ]
      }
    ]
  },
  cryptofest: {
    id: 'cryptofest',
    name: 'Tulum Crypto Fest',
    description: 'A fusion of ancient wisdom and future finance in the heart of the Mayan Riviera',
    image: 'https://images.unsplash.com/photo-1509087859087-a384654eca4d?auto=format&fit=crop&q=80&w=1920',
    storyIntro: 'Welcome to where ancient wisdom meets future finance. The jungle whispers secrets of sustainable innovation...',
    travelText: 'The Modal Motorcoach transforms into a jungle cruiser as we venture into the mystical Mayan paradise! 🌴✨',
    date: 'December 12-15, 2024',
    activities: [
      {
        id: 'beach-welcome',
        name: 'Beach Welcome Day',
        description: 'Join the opening ceremonies at Papaya Playa Project',
        rewards: ['🏖️', '🌊'],
        points: { hand: 30, earth: 20 },
        story: [
          'The waves crash in rhythm with your heartbeat...',
          'Connect with fellow regenerators on the pristine beach...',
          'The welcome ceremony begins as the sun sets...'
        ]
      },
      {
        id: 'jungle-conference',
        name: 'Jungle Conference',
        description: 'Attend talks and workshops at KAN Tulum',
        rewards: ['🌴', '💡'],
        points: { space: 40, carbon: 30 },
        story: [
          'Morning yoga and meditation center your spirit...',
          'Breakthrough ideas emerge in the jungle setting...',
          'The ancient and modern worlds merge in harmony...'
        ]
      }
    ],
    quests: [
      {
        id: 'tulum-1',
        title: 'Jungle Innovation',
        description: 'Develop sustainable solutions inspired by nature',
        points: { earth: 50, space: 40 },
        completed: false,
        rewards: ['🌴', '💡'],
        story: 'Let the wisdom of the jungle guide your innovation...',
        milestones: [
          'Morning meditation',
          'Biomimicry workshop',
          'Project presentation'
        ]
      }
    ]
  },
  devcon: {
    id: 'devcon',
    name: 'Devcon Bangkok',
    description: 'The annual Ethereum family reunion in the vibrant heart of Thailand',
    image: 'https://images.unsplash.com/photo-1583395838144-c94d7f5b0c6c?auto=format&fit=crop&q=80&w=1920',
    storyIntro: 'Welcome to the bustling streets of Bangkok, where ancient temples meet cutting-edge blockchain innovation. The air is thick with possibility and the scent of street food...',
    travelText: 'The Modal Motorcoach transforms into a tuk-tuk, weaving through the neon-lit streets of Bangkok! 🛵✨',
    date: 'October 15-18, 2024',
    activities: [
      {
        id: 'morning-ceremony',
        name: 'Temple Blessing',
        description: 'Start your Devcon journey with a traditional Thai blessing',
        rewards: ['🙏', '✨'],
        points: { hand: 25, earth: 20 },
        story: [
          'The morning mist parts as you approach the ancient temple...',
          'Monks chant blessings for the future of technology...',
          'The fusion of tradition and innovation fills you with purpose...'
        ]
      },
      {
        id: 'eth-scaling',
        name: 'Scaling Summit',
        description: 'Deep dive into Ethereum scaling solutions and Layer 2s',
        rewards: ['🚀', '⚡'],
        points: { space: 45, carbon: 25 },
        story: [
          'The conference hall buzzes with technical discussions...',
          'Diagrams of rollups and zkproofs fill whiteboards...',
          'A sustainable scaling future becomes clearer...'
        ]
      },
      {
        id: 'night-market',
        name: 'Crypto Night Market',
        description: 'Experience a traditional Thai night market with a Web3 twist',
        rewards: ['🏮', '🍜'],
        points: { hand: 30, earth: 15 },
        story: [
          'Lanterns illuminate the bustling market streets...',
          'Local artisans showcase NFT-enhanced crafts...',
          'The aroma of street food mingles with talks of tokenomics...'
        ]
      }
    ],
    quests: [
      {
        id: 'devcon-1',
        title: 'Bangkok Bridge Builder',
        description: 'Connect traditional communities with Web3 solutions',
        points: { hand: 40, space: 35 },
        completed: false,
        rewards: ['🌉', '🤝'],
        story: 'Bridge the gap between ancient wisdom and blockchain innovation...',
        milestones: [
          'Learn local customs',
          'Design inclusive solution',
          'Present to community'
        ]
      }
    ]
  }
};

export const getActivityStory = (locationId: string, activityId: string): string[] => {
  const location = locations[locationId];
  if (!location) return [];
  
  const activity = location.activities?.find(a => a.id === activityId);
  if (!activity) return [];
  
  return activity.story;
};