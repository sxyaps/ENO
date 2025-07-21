'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductRevealProps {
  productImage: string;
  productName: string;
  delay?: number;
  className?: string;
}

export default function ProductReveal({
  productImage,
  productName,
  delay = 1000,
  className = ''
}: ProductRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  
  useEffect(() => {
    // Start reveal animation after delay
    const timer = setTimeout(() => {
      setAnimationStarted(true);
      
      // Set fully revealed after animation completes
      setTimeout(() => {
        setRevealed(true);
      }, 1500);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`relative overflow-hidden rounded-sm transition-all duration-[2000ms] ease-out
          ${animationStarted ? 'opacity-100' : 'opacity-0'}
          ${revealed ? 'shadow-2xl' : ''}
        `}
      >
        {/* Product image container */}
        <div className="relative aspect-square">
          <Image 
            src={productImage} 
            alt={productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          
          {/* Reveal overlay */}
          <div 
            className={`absolute inset-0 bg-black transition-transform duration-[1500ms] ease-in-out ${
              animationStarted ? 'translate-y-full' : ''
            }`}
          />
        </div>
        
        {/* Product name */}
        <div 
          className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent transition-opacity duration-1000 delay-500 ${
            revealed ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="font-serif text-lg text-white tracking-wider">
            {productName}
          </h3>
        </div>
      </div>
      
      {/* Elegant line under the product */}
      <div 
        className={`h-px w-0 bg-white/30 mx-auto mt-6 transition-all duration-[2000ms] delay-1000 ${
          revealed ? 'w-1/3' : ''
        }`}
      />
    </div>
  );
}
