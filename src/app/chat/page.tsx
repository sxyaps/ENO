'use client';

import { useState } from 'react';
import Link from 'next/link';
import GlitchText from '@/components/GlitchText';

export default function ChatPortal() {
  // Demo rooms for static build
  const demoRooms = [
    { id: "1", name: "//NOTICE", description: "Important announcements and directives" },
    { id: "2", name: "//CLAIMING", description: "Process for claiming and verification" },
    { id: "3", name: "//CONVERSATION", description: "Secure channel for member discussions" }
  ];
  
  return (
    <div className="w-full flex flex-col p-6 md:p-12 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-2xl tracking-widest mb-2">
          <GlitchText text="SECURE CHANNELS" glitchInterval={8000} />
        </h1>
        <div className="h-px w-16 bg-white/20 my-4"></div>
        <p className="text-white/50 text-sm tracking-wider">
          Access granted. Select a secure communication channel.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {demoRooms.map((room) => (
          <Link
            href={`/chat/rooms/${room.id}`}
            key={room.id}
            className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all hover:border-white/20 group"
          >
            <h2 className="font-mono text-lg mb-2 tracking-wider">
              {room.name}
            </h2>
            <p className="text-white/50 text-sm mb-4">{room.description}</p>
            <div className="flex justify-end">
              <span className="text-xs text-white/30 tracking-widest group-hover:text-white/50 transition-all">
                ENTER →
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 text-center">
        <p className="text-yellow-400 text-sm">
          This is a static demo. In production, this would connect to a secure backend for real-time chat.
        </p>
      </div>
      
      <div className="mt-12 p-4 border border-white/10 bg-white/5">
        <div className="text-xs text-white/40 font-light tracking-wider mb-1">
          SECURITY NOTICE
        </div>
        <div className="text-white/70 text-sm">
          All messages are ephemeral and will be purged after 24 hours. Your identity is anonymized.
        </div>
        <div className="mt-4 text-xs text-red-400 font-light tracking-wider">
          WARNING: Lose your object, lose your access. Forever.
        </div>
      </div>
    </div>
  );
}
