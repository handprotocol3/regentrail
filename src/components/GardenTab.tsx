import React, { useState } from 'react';
import { Sprout, Droplets } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { toast } from 'sonner';
import { WaterEffect } from './effects/WaterEffect';
import { EmojiBurst } from './effects/EmojiBurst';

export const GardenTab: React.FC = () => {
  const { gardenPlots, plantSeed, waterPlant, handBalance } = useGameStore();
  const [waterEffectPos, setWaterEffectPos] = useState<{ x: number; y: number } | null>(null);
  const [emojiBurst, setEmojiBurst] = useState<{ x: number; y: number; emoji: string } | null>(null);

  const handlePlotAction = (index: number, e: React.MouseEvent) => {
    const plot = gardenPlots[index];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (!plot.plant) {
      if (handBalance.balance < 10) {
        toast.error('Not enough HAND tokens! Need 10 🖐️ to plant');
        return;
      }
      plantSeed(index);
      setEmojiBurst({ x, y, emoji: '🌱' });
      toast.success('Planted a new seed! 🌱');
    } else {
      if (handBalance.balance < 5) {
        toast.error('Not enough HAND tokens! Need 5 🖐️ to water');
        return;
      }
      setWaterEffectPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setEmojiBurst({ x, y, emoji: '💧' });
      setTimeout(() => setWaterEffectPos(null), 1000);
      waterPlant(index);
      if (plot.growth < 1) {
        toast.success('Plant watered! 💧', {
          description: `Growth: ${Math.round(plot.growth * 100)}%`
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Your Garden</h2>
        <p className="text-gray-400 mb-4">Plant seeds (10 🖐️) and water your plants (5 🖐️) to help them grow. Fully grown plants can be harvested for points!</p>
        <div className="text-sm text-gray-300">
          Active Plants: {gardenPlots.filter((p) => p.plant).length}/{gardenPlots.length}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {gardenPlots.map((plot, index) => (
          <div
            key={index}
            onClick={(e) => handlePlotAction(index, e)}
            className="eco-card aspect-square flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 relative group"
          >
            {plot.plant ? (
              <div className="text-center">
                <div 
                  className="text-4xl mb-2 transition-transform duration-300" 
                  style={{ 
                    transform: `scale(${0.5 + (plot.growth * 0.5)})`,
                  }}
                >
                  {plot.plant.emoji}
                </div>
                <div className="text-sm font-medium text-emerald-400">
                  {plot.plant.name}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Growth: {Math.round(plot.growth * 100)}%
                </div>
                {plot.growth < 1 && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Droplets size={20} className="text-blue-400 animate-bounce" />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400 hover:text-emerald-500 transition-colors group">
                <Sprout size={32} className="mx-auto group-hover:animate-bounce" />
                <div className="text-sm mt-2">Plant Seed</div>
                <div className="text-xs text-gray-500 mt-1">10 🖐️</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {waterEffectPos && (
        <WaterEffect x={waterEffectPos.x} y={waterEffectPos.y} />
      )}
      
      {emojiBurst && (
        <EmojiBurst
          x={emojiBurst.x}
          y={emojiBurst.y}
          emoji={emojiBurst.emoji}
          onComplete={() => setEmojiBurst(null)}
        />
      )}
    </div>
  );
};