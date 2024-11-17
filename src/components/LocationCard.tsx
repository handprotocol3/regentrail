import React from 'react';
import { Location } from '../types/game';
import { useGameStore } from '../store/gameStore';

interface LocationCardProps {
  location: Location;
  onSelect: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, onSelect }) => {
  const currentLocation = useGameStore((state) => state.currentLocation);
  const isActive = currentLocation === location.id;

  return (
    <div
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
        isActive ? 'ring-4 ring-emerald-400' : 'hover:ring-2 ring-emerald-200'
      }`}
      onClick={onSelect}
    >
      <img
        src={location.image}
        alt={location.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 p-4 text-white">
        <h3 className="text-xl font-bold">{location.name}</h3>
        <p className="text-sm opacity-90">{location.description}</p>
      </div>
    </div>
  );
}