'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import DustEffect from '@/components/DustEffect';
import GlitchText from '@/components/GlitchText';

export default function ThankYouPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    // Delayed reveal for dramatic effect
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      
      const fadeTimer = setTimeout(() => {
        setFadeIn(true);
      }, 1200);
      
      return () => clearTimeout(fadeTimer);
    }, 800);
    
    // Remove fake access logic for real payment flow
    
    return () => clearTimeout(loadTimer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-black relative overflow-hidden">
      <DustEffect />
      
      {/* Abstract background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] border border-white/10 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className={`max-w-sm transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${fadeIn ? 'transform translate-y-0' : 'transform translate-y-10'}`}>
        <div className="mb-8">
          {accessGranted ? (
            <div className="inline-block p-1 border border-white/20">
              <GlitchText 
                text="ACCESS VERIFIED" 
                className="font-mono text-sm tracking-[0.2em] text-white/90" 
                glitchInterval={3000}
                glitchProbability={0.2}
              />
            </div>
          ) : (
            <div className="inline-block">
              <p className="font-serif text-sm uppercase tracking-[0.2em] text-white/60">Confirmed</p>
            </div>
          )}
        </div>
        
        <h1 className="font-serif text-xl md:text-2xl mb-10 uppercase tracking-wider font-light">Signal Kit Secured</h1>
        
        <div className="w-12 h-[0.5px] bg-white/20 mx-auto mb-10"></div>
        
        <p className="text-white/50 text-xs leading-relaxed mb-12 font-light">
          Your ENO-YEK signal kit will ship within 3-5 business days in unmarked packaging. No signature required.
        </p>
        
        {accessGranted ? (
          <div className="border border-white/10 p-8 mb-12 bg-black relative">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-10"></div>
            <div className="relative z-10">
              <p className="text-white/90 text-xs mb-6 font-light tracking-wide">
                Your identifier has been selected for elevated status. Further instructions will be provided via secure channel.
              </p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Discretion advised</p>
            </div>
          </div>
        ) : (
          <div className="border-t border-white/5 pt-8 mb-12">
            <p className="text-white/50 text-xs font-light">
              Tap your pendant with any NFC-enabled device to verify authenticity upon arrival.
            </p>
          </div>
        )}
        
        <Link 
          href="/"
          className="inline-block px-6 py-3 text-xs tracking-wider text-white/60 hover:text-white/90 transition-colors duration-300"
        >
          <span className="relative">
            RETURN
            <span className="absolute bottom-0 left-0 right-0 h-px bg-white/20 transform scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
          </span>
        </Link>
      </div>
    </div>
  );
}
