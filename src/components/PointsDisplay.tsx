import React from 'react';
import { Sprout, Rocket, Users, Leaf } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const PointsDisplay: React.FC = () => {
  const points = useGameStore((state) => state.points);

  const categories = [
    { name: 'earth', icon: Sprout, value: points.earth, color: 'emerald', bgColor: 'from-emerald-500/20 to-emerald-600/20' },
    { name: 'space', icon: Rocket, value: points.space, color: 'blue', bgColor: 'from-blue-500/20 to-blue-600/20' },
    { name: 'hand', icon: Users, value: points.hand, color: 'purple', bgColor: 'from-purple-500/20 to-purple-600/20' },
    { name: 'carbon', icon: Leaf, value: points.carbon, color: 'green', bgColor: 'from-green-500/20 to-green-600/20' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map(({ name, icon: Icon, value, color, bgColor }) => (
        <div
          key={name}
          className={`p-4 rounded-xl bg-gradient-to-br ${bgColor} border border-${color}-400/30 backdrop-blur-sm relative overflow-hidden group`}
        >
          <div className="flex items-center gap-2">
            <Icon className={`text-${color}-400`} size={20} />
            <span className="font-medium capitalize text-gray-100">{name}</span>
          </div>
          <div className={`text-2xl font-bold text-${color}-400 mt-1 transition-transform group-hover:scale-110`}>
            {value}
          </div>
          <div className="points-particles absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
};