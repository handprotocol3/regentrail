import React, { useState } from 'react';
import { Pill, Sprout, TreePine, Droplets } from 'lucide-react';

interface GreenPillIntroProps {
  onStart: () => void;
}

export const GreenPillIntro: React.FC<GreenPillIntroProps> = ({ onStart }) => {
  const [showStory, setShowStory] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-2xl text-center space-y-8 relative">
        {!showStory ? (
          <>
            <div className="relative">
              <Pill 
                size={64} 
                className="text-emerald-400 mx-auto animate-pulse"
                style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent blur-xl" />
            </div>
            
            <h1 className="text-5xl font-bold text-emerald-400 title-effect">
              Ready to go full Regen?
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              The world stands at a crossroads. Will you take the green pill and join the 
              regenerative revolution? 🌱
            </p>
            
            <button
              onClick={() => setShowStory(true)}
              className="glass-button px-8 py-4 text-lg group hover:bg-emerald-600/20 hover:scale-110 transition-all duration-500"
            >
              <span className="group-hover:animate-pulse">Take the Green Pill</span>
            </button>
          </>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-center gap-8">
              <TreePine size={32} className="text-emerald-400 animate-bounce" />
              <Sprout size={32} className="text-emerald-400 animate-bounce delay-100" />
              <Droplets size={32} className="text-emerald-400 animate-bounce delay-200" />
            </div>

            <div className="space-y-6 text-left bg-black/20 p-8 rounded-xl border border-emerald-500/20">
              <p className="text-lg text-gray-300 leading-relaxed">
                Welcome to the Regen Trail—a journey through the regenerative web3 ecosystem. 
                Here, your actions ripple through digital forests, impact real communities, 
                and shape the future of our planet.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                From ETHDenver's snow-capped peaks to the vibrant halls of ETHcc Paris, 
                you'll explore a world where technology meets ecology. Fund impactful projects, 
                grow your own digital garden, and join a global community of regenerators.
              </p>

              <p className="text-lg text-emerald-400 font-medium">
                Are you ready to make your mark on the regenerative future?
              </p>
            </div>

            <button
              onClick={onStart}
              className="action-button px-8 py-4 text-lg group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Begin Your Journey
                <Sprout className="group-hover:animate-bounce" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};