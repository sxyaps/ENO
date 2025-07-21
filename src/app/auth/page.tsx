'use client';

import { useState, useEffect } from 'react';
import GlitchText from '@/components/GlitchText';
import DustEffect from '@/components/DustEffect';
import NightSky from '@/components/NightSky';
import HoverEffect from '@/components/HoverEffect';

export default function AuthPage() {
  const [nfcUid, setNfcUid] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  
  useEffect(() => {
    // Add a subtle fade-in effect
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nfcUid || !accessCode) {
      setError('Both NFC tag ID and access code are required.');
      return;
    }
    
    // Show loading state
    setLoading(true);
    
    // Simulate authentication for static build
    setTimeout(() => {
      setLoading(false);
      setError('This is a static build. In production, this would connect to a secure authentication system.');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <NightSky starCount={120} density={0.2} />
      <DustEffect />
      
      <div className={`max-w-md w-full space-y-8 relative z-10 transition-all duration-1000 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="text-center">
          <h1 className="text-2xl font-serif tracking-wider mb-1">
            <GlitchText text="SECURE ACCESS" glitchInterval={5000} />
          </h1>
          <div className="h-px w-12 bg-white/30 mx-auto my-6"></div>
          <p className="text-white/60 text-sm mb-8 font-light tracking-wide">
            Verification required. Access is permanent and non-transferable.
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="sr-only" htmlFor="nfc-uid">
              NFC Tag ID
            </label>
            <input
              id="nfc-uid"
              name="nfcUid"
              type="text"
              value={nfcUid}
              onChange={(e) => setNfcUid(e.target.value)}
              required
              className="appearance-none relative block w-full px-4 py-3 bg-black border border-white/20 placeholder-white/40 text-white focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 sm:text-sm tracking-wider"
              placeholder="NFC TAG ID"
            />
          </div>
          
          <div>
            <label className="sr-only" htmlFor="access-code">
              Access Code
            </label>
            <input
              id="access-code"
              name="accessCode"
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              required
              className="appearance-none relative block w-full px-4 py-3 bg-black border border-white/20 placeholder-white/40 text-white focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 sm:text-sm tracking-wider"
              placeholder="ACCESS CODE FROM SCROLL"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          
          <div>
            <HoverEffect effectIntensity={0.08}>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-white/30 text-sm font-medium text-white hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white/20 tracking-widest transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="animate-pulse">VERIFYING...</span>
              ) : (
                <span>VERIFY ACCESS</span>
              )}
            </button>
          </HoverEffect>
          </div>
          
          {error && (
            <div className="text-center text-yellow-400 text-sm mt-4">{error}</div>
          )}
        </form>
        
        <div className="mt-12 text-center">
          <p className="text-xs text-white/40 font-light tracking-wide">
            Lose your object, lose your access. <span className="text-white/60">Forever.</span>
          </p>
          
          {/* Hidden admin access */}
          <button 
            onClick={() => {
              const password = prompt('Enter admin password:');
              if (password === 'enoyekadmin') {
                window.location.href = '/chat';
              }
            }}
            className="mt-8 opacity-20 hover:opacity-40 text-[10px] text-white/30 underline transition-opacity"
          >
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
}
