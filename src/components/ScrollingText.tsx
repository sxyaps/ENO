'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollingTextProps {
  texts: string[];
  speed?: number;
  className?: string;
  direction?: 'left' | 'right';
}

export default function ScrollingText({
  texts,
  speed = 40,
  className = '',
  direction = 'left'
}: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Create a repeated array of texts for seamless looping
  const repeatedTexts = [...texts, ...texts, ...texts];
  
  return (
    <div 
      ref={containerRef} 
      className={`w-full overflow-hidden whitespace-nowrap ${className}`}
    >
      <div 
        className={`inline-block transition-transform ${
          isVisible ? 'duration-[60s] ease-linear' : 'duration-0'
        }`}
        style={{
          transform: isVisible 
            ? `translateX(${direction === 'left' ? '-50%' : '0%'})`
            : `translateX(${direction === 'left' ? '0%' : '-50%'})`,
          animationPlayState: isVisible ? 'running' : 'paused'
        }}
      >
        {repeatedTexts.map((text, index) => (
          <span 
            key={index}
            className="inline-block mx-8 opacity-60 font-light text-sm tracking-wider"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
