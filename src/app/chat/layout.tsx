'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DustEffect from '@/components/DustEffect';

// Chat Portal Layout
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  // For static demo, use a fixed glyph name
  const glyphName = "◊-VOID-◊";
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <DustEffect particleCount={50} />
      
      {/* Header */}
      <header className="border-b border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-serif text-lg tracking-widest mr-2">ENO-YEK</div>
            <span className="text-xs text-white/40 tracking-wider">//SECURE</span>
          </div>
          
          <div className="flex items-center">
            {glyphName && (
              <div className="mr-6 text-sm tracking-wider text-white/70 hidden md:block">
                <span className="text-white/40 mr-2">ID:</span>
                {glyphName}
              </div>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none md:hidden"
            >
              <span className="sr-only">Open menu</span>
              <div className="w-5 h-0.5 bg-white/70 mb-1"></div>
              <div className="w-5 h-0.5 bg-white/70 mb-1"></div>
              <div className="w-5 h-0.5 bg-white/70"></div>
            </button>
            
            <button
              onClick={handleLogout}
              className="text-xs tracking-wider border-b border-white/20 pb-px hover:border-white/60 transition-colors hidden md:block"
            >
              LOGOUT
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 p-4 md:hidden">
            {glyphName && (
              <div className="mb-4 text-sm tracking-wider text-white/70">
                <span className="text-white/40 mr-2">ID:</span>
                {glyphName}
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="text-xs tracking-wider border-b border-white/20 pb-px hover:border-white/60 transition-colors"
            >
              LOGOUT
            </button>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-1 overflow-hidden flex">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-3 px-4 text-center text-xs text-white/40 tracking-wider relative z-10">
        <div className="container mx-auto">
          <p>ENO-YEK ACCESS TERMINAL // SESSION EXPIRES IN 24H</p>
        </div>
      </footer>
    </div>
  );
}
