import React, { createContext, useContext, useEffect, useState } from 'react';
import { MockSocketService } from '../services/mockSocketService';

interface SocketContextType {
  socket: MockSocketService | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

interface SocketProviderProps {
  userId: string;
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ userId, children }) => {
  const [socket, setSocket] = useState<MockSocketService | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const newSocket = new MockSocketService(userId);

    // Simuler la connexion
    setTimeout(() => {
      setIsConnected(true);
    }, Math.random() * 500 + 500);

    setSocket(newSocket);

    return () => {
      setIsConnected(false);
      // Nettoyage des listeners si nécessaire
      if (newSocket) {
        const listeners = newSocket.getListeners();
        Object.keys(listeners).forEach(event => {
          newSocket.off(event);
        });
      }
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket doit être utilisé dans un SocketProvider');
  }
  return context;
}; 