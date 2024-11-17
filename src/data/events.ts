import { Event } from '../types/game';

export const events: Event[] = [
  {
    id: 'ethcc',
    name: 'ETHcc Paris',
    date: 'July 8-10, 2024',
    description: 'The largest annual European Ethereum event, focused on technology and community. Join workshops, hackathons, and connect with fellow builders in the heart of Paris.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1920',
    attendees: 324,
    location: 'Paris, France',
    travelText: 'Hopping on the Modal Motorcoach, cruising through the digital boulevards of Paris! 🇫🇷✨',
    link: 'https://ethcc.io',
    schedule: [
      { time: '9:00 AM', activity: 'Opening Ceremony' },
      { time: '10:00 AM', activity: 'Regenerative Finance Panel' },
      { time: '2:00 PM', activity: 'Sustainability Hackathon' },
      { time: '5:00 PM', activity: 'Community Meetup' }
    ]
  },
  {
    id: 'cryptofest',
    name: 'Tulum Crypto Fest',
    date: 'December 12-15, 2024',
    description: 'A unique fusion of ancient wisdom and future finance, featuring workshops on regenerative cities, decentralized protocols, and holistic lifestyle in the heart of the Mayan Riviera.',
    image: 'https://images.unsplash.com/photo-1509087859087-a384654eca4d?auto=format&fit=crop&q=80&w=1920',
    attendees: 256,
    location: 'Tulum, Mexico',
    travelText: 'The Modal Motorcoach transforms into a jungle cruiser as we venture into the mystical Mayan paradise! 🌴✨',
    link: 'https://tulumcryptofest.com',
    schedule: [
      { 
        time: 'Day 1',
        activity: 'Beach Welcome @ Papaya Playa Project - Registration, Panels & Welcome Party'
      },
      { 
        time: 'Day 2',
        activity: 'KAN Tulum - Morning Wellness, Conferences, VIP Dinner & Secret Party'
      },
      { 
        time: 'Day 3',
        activity: 'Workshops, Full Moon Ceremony & Party at Secret Location'
      },
      { 
        time: 'Day 4',
        activity: 'Whale Tank Contest, Closing Ceremony & Farewell Party'
      }
    ]
  },
  {
    id: 'permadao',
    name: 'PermaDAO Summit',
    date: 'August 15-17, 2024',
    description: 'A gathering of regenerative finance pioneers and permaculture enthusiasts. Experience hands-on workshops, ecosystem restoration projects, and collaborative governance sessions.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1920',
    attendees: 156,
    location: 'Costa Rica',
    travelText: 'The Modal Motorcoach transforms into a jungle cruiser as we head to the heart of regeneration! 🌴🌿',
    link: 'https://permadao.com',
    schedule: [
      { time: '8:00 AM', activity: 'Morning Meditation' },
      { time: '10:00 AM', activity: 'Permaculture Workshop' },
      { time: '2:00 PM', activity: 'DAO Governance Session' },
      { time: '4:00 PM', activity: 'Community Garden Project' }
    ]
  }
];