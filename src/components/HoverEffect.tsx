'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface HoverEffectProps {
  children: ReactNode;
  className?: string;
  effectIntensity?: number; // 0-1 scale
}

export default function HoverEffect({
  children,
  className = '',
  effectIntensity = 0.1
}: HoverEffectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position over element
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    
    // Calculate position relative to center (from -1 to 1)
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    setPosition({ x, y });
  };
  
  // Clean up any effects when component unmounts
  useEffect(() => {
    return () => {
      setIsHovered(false);
    };
  }, []);
  
  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main content */}
      <div
        className="relative z-10 transition-transform duration-300"
        style={{
          transform: isHovered
            ? `translate(${position.x * 2 * effectIntensity}px, ${
                position.y * 2 * effectIntensity
              }px)`
            : 'translate(0, 0)'
        }}
      >
        {children}
      </div>
      
      {/* Subtle glow effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none bg-gradient-radial ${
          isHovered ? 'opacity-20' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(
            circle at ${50 + position.x * 50}% ${50 + position.y * 50}%,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 70%
          )`,
        }}
      />
      
      {/* Border highlight on hover */}
      <div 
        className={`absolute inset-0 border border-white/0 transition-all duration-300 pointer-events-none ${
          isHovered ? 'border-white/20' : ''
        }`} 
      />
    </div>
  );
}
