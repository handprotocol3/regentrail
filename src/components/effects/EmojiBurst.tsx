import React, { useEffect, useState } from 'react';

interface EmojiParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  emoji: string;
}

interface EmojiBurstProps {
  emoji: string;
  x: number;
  y: number;
  onComplete?: () => void;
}

export const EmojiBurst: React.FC<EmojiBurstProps> = ({ emoji, x, y, onComplete }) => {
  const [particles, setParticles] = useState<EmojiParticle[]>([]);

  useEffect(() => {
    const particleCount = 8;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      rotation: (i * 360) / particleCount,
      scale: 0.5 + Math.random() * 0.5,
      opacity: 1,
      emoji
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [emoji, onComplete]);

  return (
    <div 
      className="fixed pointer-events-none"
      style={{ left: x, top: y }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute left-0 top-0 transform-gpu transition-all duration-1000"
          style={{
            transform: `
              rotate(${particle.rotation}deg) 
              translate(${50 * Math.cos(particle.rotation * Math.PI / 180)}px, 
                       ${50 * Math.sin(particle.rotation * Math.PI / 180)}px) 
              scale(${particle.scale})
            `,
            opacity: particle.opacity,
            animation: 'emoji-burst 1s ease-out forwards'
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};