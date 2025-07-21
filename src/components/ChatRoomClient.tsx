"use client";

import { useState } from "react";

export default function ChatRoomClient({ roomName }: { roomName: string }) {
  const [newMessage, setNewMessage] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);
  const CHAT_PASSWORD = "luxury";

  const demoMessages = [
    {
      id: "1",
      sender: "◊-VOID-◊",
      message:
        "Signal detected at 42.3601° N, 71.0589° W. Confirmation required.",
      timestamp: "19:42",
    },
    {
      id: "2",
      sender: "◊-VOID-◊",
      message:
        "Verified. Pattern matches previous occurrences. Level 3 clearance required for details.",
      timestamp: "19:45",
    },
    {
      id: "3",
      sender: "⌂-CR0SS-⌂",
      message:
        "Access granted. Coordinates received. Proceed with caution.",
      timestamp: "19:51",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewMessage("");
    alert(
      "This is a static demo. In production, this would send a real message."
    );
  };

  if (!access) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <h2 className="text-white text-xl font-serif mb-6 tracking-widest">
          Enter Room Password
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password === CHAT_PASSWORD) setAccess(true);
            else alert("Incorrect password.");
          }}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 bg-black border border-white/20 text-white text-lg tracking-widest focus:outline-none focus:border-white/40"
            placeholder="Password"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white/10 border border-white/20 text-white text-lg tracking-wider hover:bg-white/15 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Chat header */}
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <a
              href="/chat"
              className="text-xs text-white/50 hover:text-white/70 transition-colors flex items-center"
            >
              <span className="mr-2">←</span> BACK
            </a>
            <h1 className="font-mono text-lg mt-2">{roomName}</h1>
          </div>
          <div className="text-xs text-white/30 tracking-wider">EPHEMERAL</div>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4">
        {demoMessages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-white/40">{message.sender}</span>
              <span className="text-xs text-white/30">{message.timestamp}</span>
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
              !newMessage.trim() ? "opacity-50 cursor-not-allowed" : ""
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
