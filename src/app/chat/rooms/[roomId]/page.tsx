'use client';

import { useState } from 'react';
import Link from 'next/link';

// Generate the room IDs for static paths
export function generateStaticParams() {
  return [
    { roomId: '1' },
    { roomId: '2' },
    { roomId: '3' }
  ];
}

export default function ChatRoom({ params }: { params: { roomId: string } }) {
  const { roomId } = params;
  const [newMessage, setNewMessage] = useState<string>('');
  
  // Get room name based on ID
  const getRoomName = (id: string) => {
    switch (id) {
      case '1': return '//SIGHTINGS';
      case '2': return '//CONVERSIONS';
      case '3': return '//ACCESS_LOG';
      default: return '//UNKNOWN';
    }
  };
  
  const roomName = getRoomName(roomId);
  
  // Demo messages
  const demoMessages = [
    {
      id: '1',
      sender: '◊-VOID-◊',
      message: 'Signal detected at 42.3601° N, 71.0589° W. Confirmation required.',
      timestamp: '19:42'
    },
    {
      id: '2',
      sender: 'Ω-DAWN-Ω',
      message: 'Verified. Pattern matches previous occurrences. Level 3 clearance required for details.',
      timestamp: '19:45'
    },
    {
      id: '3',
      sender: '⌂-CR0SS-⌂',
      message: 'Access granted. Coordinates received. Proceed with caution.',
      timestamp: '19:51'
    }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewMessage('');
    alert('This is a static demo. In production, this would send a real message.');
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* Chat header */}
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/chat"
              className="text-xs text-white/50 hover:text-white/70 transition-colors flex items-center"
            >
              <span className="mr-2">←</span> BACK
            </Link>
            <h1 className="font-mono text-lg mt-2">{roomName}</h1>
          </div>
          <div className="text-xs text-white/30 tracking-wider">EPHEMERAL</div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {demoMessages.map((message) => (
          <div key={message.id} className="border-b border-white/5 pb-3 last:border-0">
            <div className="flex justify-between items-start">
              <div className="font-mono text-white/90">{message.sender}</div>
              <div className="text-white/30 text-xs">{message.timestamp}</div>
            </div>
            <div className="mt-2 text-white/80 text-sm tracking-wide pl-1">
              {message.message}
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 text-center">
          <p className="text-yellow-400 text-sm">
            This is a static demo. In production, this would be a live chat room with real-time messaging.
          </p>
        </div>
      </div>
      
      {/* Message input */}
      <div className="border-t border-white/10 p-4">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter message..."
            className="flex-1 bg-black border border-white/20 p-3 focus:outline-none focus:border-white/40 text-white text-sm"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`px-6 py-3 bg-white/10 border border-white/20 text-white text-sm tracking-wider ml-2 hover:bg-white/15 transition-colors ${
              !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            SEND
          </button>
        </form>
        <div className="text-xs text-white/30 mt-2">
          Messages expire after 24 hours
        </div>
      </div>
    </div>
  );
}
