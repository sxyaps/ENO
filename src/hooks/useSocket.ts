'use client';

import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

// Socket.io client instance
let socket: Socket;

// Hook to initialize Socket.io connection
export const useSocket = (roomId: string, onMessageReceived: (message: any) => void) => {
  useEffect(() => {
    // Initialize socket connection if it doesn't exist
    if (!socket) {
      socket = io({
        path: '/api/socketio',
      });
      
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
      });
      
      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
      
      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }
    
    // Join the chat room
    socket.emit('join_room', roomId);
    
    // Listen for new messages
    socket.on('chat_message', onMessageReceived);
    
    return () => {
      // Leave the room and remove event listeners
      socket.emit('leave_room', roomId);
      socket.off('chat_message', onMessageReceived);
    };
  }, [roomId, onMessageReceived]);
  
  return {
    socket,
    sendMessage: (message: string) => {
      if (socket && socket.connected) {
        socket.emit('chat_message', {
          roomId,
          message,
        });
      }
    },
  };
};
