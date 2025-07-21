import { User, ChatMessage, ChatRoom } from "@/types/auth";
import { v4 as uuidv4 } from "uuid";

// In a real application, this would be a secure database connection
// For the purpose of this demo, we're using in-memory storage
// In production, this should be replaced with a secure database like PostgreSQL

// Mock users database with pre-registered NFC UIDs and access codes
const users: User[] = [
  {
    id: "1",
    nfcUid: "04:A2:E9:B2:C1:D3", // Example NFC UID
    accessCode: "ACCESS-X1G4",    // Example access code from physical scroll
    isAuthenticated: false,
    glyphName: "⌂-CR0SS-⌂"
  },
  {
    id: "2",
    nfcUid: "7A:9F:E1:D3:B5:C2", // Example NFC UID
    accessCode: "ACCESS-Z9F2",    // Example access code from physical scroll
    isAuthenticated: false,
    glyphName: "◊-VOID-◊"
  },
  {
    id: "3",
    nfcUid: "B1:C3:D5:E7:F9:A2", // Example NFC UID
    accessCode: "ACCESS-T8K3",    // Example access code from physical scroll
    isAuthenticated: false,
    glyphName: "Ω-DAWN-Ω"
  }
];

// Mock chat rooms
const chatRooms: ChatRoom[] = [
  {
    id: "1",
    name: "//SIGHTINGS",
    description: "Report and discuss anomalous sightings"
  },
  {
    id: "2",
    name: "//CONVERSIONS",
    description: "Share experiences of the conversion process"
  },
  {
    id: "3", 
    name: "//ACCESS_LOG",
    description: "Track new members gaining access"
  }
];

// Mock chat messages (ephemeral, will be cleared regularly)
let chatMessages: ChatMessage[] = [];

// Database service
export const db = {
  // User authentication
  findUserByNfcUid: (nfcUid: string): User | undefined => {
    return users.find(user => user.nfcUid === nfcUid);
  },

  validateAccessCode: (nfcUid: string, accessCode: string): User | undefined => {
    const user = users.find(
      user => user.nfcUid === nfcUid && user.accessCode === accessCode
    );
    return user;
  },

  setUserAuthenticated: (userId: string, token: string): User | undefined => {
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      // Create session expiry - 24 hours from now
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 24);
      
      // Update user session info
      users[userIndex] = {
        ...users[userIndex],
        isAuthenticated: true,
        lastAuthenticated: new Date(),
        sessionToken: token,
        sessionExpiry: expiry
      };
      
      return users[userIndex];
    }
    
    return undefined;
  },

  verifySession: (userId: string, token: string): boolean => {
    const user = users.find(u => u.id === userId);
    
    if (!user) return false;
    
    // Check if the session is still valid
    const isValid = user.isAuthenticated &&
                   user.sessionToken === token &&
                   user.sessionExpiry !== undefined &&
                   user.sessionExpiry > new Date();
                   
    return isValid;
  },

  logoutUser: (userId: string): boolean => {
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        isAuthenticated: false,
        sessionToken: undefined,
        sessionExpiry: undefined
      };
      return true;
    }
    
    return false;
  },

  // Chat functionality
  getChatRooms: (): ChatRoom[] => {
    return chatRooms;
  },

  getChatRoomById: (roomId: string): ChatRoom | undefined => {
    return chatRooms.find(room => room.id === roomId);
  },

  getMessagesForRoom: (roomId: string): ChatMessage[] => {
    // Return only messages for the specific room
    // In a real app, this would also include pagination
    return chatMessages
      .filter(msg => msg.roomId === roomId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  },

  addMessage: (roomId: string, sender: string, message: string): ChatMessage => {
    const newMessage = {
      id: uuidv4(),
      roomId,
      sender,
      message,
      timestamp: new Date()
    };
    
    chatMessages.push(newMessage);
    
    // Limit messages to 100 per room to simulate ephemeral nature
    const roomMessages = chatMessages.filter(msg => msg.roomId === roomId);
    if (roomMessages.length > 100) {
      // Remove oldest messages that exceed the limit
      const messagesToRemove = roomMessages.length - 100;
      const oldestMessages = roomMessages
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
        .slice(0, messagesToRemove)
        .map(msg => msg.id);
      
      chatMessages = chatMessages.filter(msg => !oldestMessages.includes(msg.id));
    }
    
    return newMessage;
  },

  // Maintenance function to clear old messages (simulating 24-hour ephemeral messaging)
  clearOldMessages: () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    chatMessages = chatMessages.filter(msg => msg.timestamp > yesterday);
    
    return chatMessages.length;
  }
};

// Set up a periodic task to clear old messages
// In a real app, this would be a cron job or scheduled task
setInterval(db.clearOldMessages, 1000 * 60 * 60); // Run every hour
