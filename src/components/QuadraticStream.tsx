import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export const QuadraticStream: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticle = () => {
    const particle: Particle = {
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
      opacity: 1
    };
    setParticles(prev => [...prev, particle]);
  };

  useEffect(() => {
    const handleDonation = (event: CustomEvent<{ amount: number; projectId: string }>) => {
      const { amount } = event.detail;
      const burstCount = Math.min(50, amount);
      
      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
          createParticle();
        }, i * 50);
      }
    };

    window.addEventListener('donation', handleDonation as EventListener);
    return () => window.removeEventListener('donation', handleDonation as EventListener);
  }, []);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            y: particle.y - particle.speed,
            opacity: particle.opacity - 0.01
          }))
          .filter(particle => particle.opacity > 0)
      );
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-emerald-400"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transform: `scale(${particle.opacity})`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      ))}
    </div>
  );
};