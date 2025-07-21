'use client';

import { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
}

interface DustEffectProps {
  particleCount?: number;
}

export default function DustEffect({ particleCount = 20 }: DustEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles: Particle[] = [];
    const count = particleCount; // Number of dust particles
    
    for (let i = 0; i < count; i++) {
      initialParticles.push({
        x: Math.random() * 100, // % position across screen
        y: Math.random() * 100, // % position across screen
        size: Math.random() * 2 + 1, // Size between 1-3px
        speedY: Math.random() * 0.1 - 0.05, // Very slow vertical movement
        opacity: Math.random() * 0.15 + 0.05 // Low opacity between 0.05-0.2
      });
    }
    
    setParticles(initialParticles);
    
    // Animation loop
    const animationId = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Move particles slightly
          let newY = particle.y + particle.speedY;
          
          // Wrap particles when they go off screen
          if (newY > 100) newY = 0;
          if (newY < 0) newY = 100;
          
          // Randomly change opacity for shimmer effect
          let newOpacity = particle.opacity + (Math.random() * 0.02 - 0.01);
          if (newOpacity < 0.05) newOpacity = 0.05;
          if (newOpacity > 0.2) newOpacity = 0.2;
          
          return {
            ...particle,
            y: newY,
            opacity: newOpacity
          };
        })
      );
    }, 100);
    
    return () => clearInterval(animationId);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle, index) => (
        <div 
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
}
