'use client';

import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
  glitchDuration?: number;
  glitchProbability?: number;
}

export default function GlitchText({
  text,
  className = '',
  glitchInterval = 5000,
  glitchDuration = 100,
  glitchProbability = 0.1
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    // Characters that might appear during the glitch
    const glitchChars = ['/', '_', '\\', '|', '-', '+', '=', '*', '&', '%', '$', '#', '@', '!'];
    
    // Function to create a glitched version of the text
    const createGlitchText = () => {
      return text.split('').map(char => {
        // Only glitch some characters
        if (Math.random() < 0.1) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return char;
      }).join('');
    };
    
    // Interval to occasionally show the glitch
    const intervalId = setInterval(() => {
      // Only glitch based on probability
      if (Math.random() < glitchProbability) {
        // Apply the glitch
        const glitchedText = createGlitchText();
        setDisplayText(glitchedText);
        
        // Reset after a short duration
        setTimeout(() => {
          setDisplayText(text);
        }, glitchDuration);
      }
    }, glitchInterval);
    
    return () => clearInterval(intervalId);
  }, [text, glitchDuration, glitchInterval, glitchProbability]);
  
  return <span className={className}>{displayText}</span>;
}
