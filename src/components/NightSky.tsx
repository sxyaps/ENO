'use client';

import { useEffect, useRef } from 'react';

interface NightSkyProps {
  starCount?: number;
  density?: number;
  className?: string;
}

export default function NightSky({
  starCount = 100,
  density = 0.5,
  className = ''
}: NightSkyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    // Create stars
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }> = [];
    
    const createStars = () => {
      stars.length = 0; // Clear previous stars
      
      for (let i = 0; i < starCount; i++) {
        // Create stars with varying properties
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          opacity: Math.random() * 0.5 + 0.1,
          pulse: Math.random() * Math.PI,
          pulseSpeed: Math.random() * 0.02 + 0.005
        });
      }
    };
    
    // Draw the night sky
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        // Pulse effect
        const opacity = star.opacity * Math.abs(Math.sin(star.pulse));
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
        
        // Update pulse for animation
        star.pulse += star.pulseSpeed;
      });
      
      // Optional: subtle dust particles with connection lines
      if (density > 0) {
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const star1 = stars[i];
            const star2 = stars[j];
            const distance = Math.sqrt(
              Math.pow(star1.x - star2.x, 2) + 
              Math.pow(star1.y - star2.y, 2)
            );
            
            // Only draw lines between nearby stars
            const threshold = (canvas.width / 10) * density;
            if (distance < threshold) {
              // Opacity based on distance
              const opacity = (1 - distance / threshold) * 0.15 * density;
              ctx.beginPath();
              ctx.moveTo(star1.x, star1.y);
              ctx.lineTo(star2.x, star2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.lineWidth = 0.2;
              ctx.stroke();
            }
          }
        }
      }
    };
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize
    resizeCanvas();
    createStars();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      createStars();
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [starCount, density]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
}
