import React, { useEffect, useState } from 'react';

interface WaterEffectProps {
  x: number;
  y: number;
}

export const WaterEffect: React.FC<WaterEffectProps> = ({ x, y }) => {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; scale: number }>>([]);

  useEffect(() => {
    const particleCount = 24;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      angle: (i * 360) / particleCount,
      scale: 0.5 + Math.random() * 0.5
    }));
    setParticles(newParticles);

    const cleanup = setTimeout(() => setParticles([]), 1000);
    return () => clearTimeout(cleanup);
  }, [x, y]);

  return (
    <>
      <div className="fixed inset-0 bg-blue-400/10 animate-ripple pointer-events-none" />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-4 h-4 rounded-full bg-blue-400/80"
              style={{
                left: x,
                top: y,
                transform: `rotate(${particle.angle}deg) translateY(-${50 * particle.scale}px) scale(${particle.scale})`,
                animation: 'water-splash 1s ease-out forwards'
              }}
            />
          ))}
          <div 
            className="absolute w-20 h-20 rounded-full"
            style={{
              left: x - 40,
              top: y - 40,
              background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)',
              animation: 'ripple 1s ease-out forwards'
            }}
          />
        </div>
      </div>
    </>
  );
};