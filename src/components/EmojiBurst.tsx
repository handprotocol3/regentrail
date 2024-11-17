import React, { useEffect, useState } from 'react';

interface EmojiParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
  scale: number;
}

interface EmojiBurstProps {
  emojis: string[];
  onComplete: () => void;
}

export const EmojiBurst: React.FC<EmojiBurstProps> = ({ emojis, onComplete }) => {
  const [particles, setParticles] = useState<EmojiParticle[]>([]);

  useEffect(() => {
    const particleCount = 12;
    const newParticles: EmojiParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      });
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [emojis, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute left-1/2 top-1/2 transition-all duration-1000"
          style={{
            transform: `translate(-50%, -50%) translate(${particle.x}px, ${
              particle.y
            }px) rotate(${particle.rotation}deg) scale(${particle.scale})`,
            animation: 'particle 1s ease-out forwards',
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

// Add to index.css:
// @keyframes particle {
//   to {
//     transform: translate(var(--x), var(--y)) rotate(var(--rotation)) scale(0);
//     opacity: 0;
//   }
// }