import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import { GameSettings, GameState, Player } from '../services/gameStateService';

export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  content: string;
  timestamp: number;
}

interface UseWaitingRoomReturn {
  players: Player[];
  messages: ChatMessage[];
  gameSettings: GameSettings;
  isReady: boolean;
  isHost: boolean;
  isEveryoneReady: boolean;
  error: string | null;
  setReady: (ready: boolean) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  startGame: () => void;
  sendMessage: (content: string) => void;
  leaveRoom: () => void;
}

export const useWaitingRoom = (gameId: string): UseWaitingRoomReturn => {
  const { socket } = useSocket();
  const [players, setPlayers] = useState<Player[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    questionsCount: 10,
    timePerQuestion: 20,
    randomOrder: true,
    showLeaderboardAfterEach: true,
    allowGuests: true
  });
  const [isReady, setIsReady] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    // Rejoindre la salle
    socket.join(gameId);

    // Écouter les événements
    socket.on('player:join', handlePlayerJoin);
    socket.on('player:leave', handlePlayerLeave);
    socket.on('player:ready', handlePlayerReady);
    socket.on('chat:message', handleChatMessage);
    socket.on('game:settings', handleGameSettings);
    socket.on('game:start', handleGameStart);
    socket.on('error', handleError);

    // Initialiser la salle
    socket.emit('game:join', { gameId });

    return () => {
      // Nettoyage
      socket.off('player:join');
      socket.off('player:leave');
      socket.off('player:ready');
      socket.off('chat:message');
      socket.off('game:settings');
      socket.off('game:start');
      socket.off('error');
    };
  }, [socket, gameId]);

  // Handlers d'événements
  const handlePlayerJoin = useCallback((data: { player: Player }) => {
    setPlayers(prev => [...prev, data.player]);
    setMessages(prev => [
      ...prev,
      {
        id: `system_${Date.now()}`,
        playerId: 'system',
        playerName: 'Système',
        content: `${data.player.name} a rejoint la partie`,
        timestamp: Date.now()
      }
    ]);
  }, []);

  const handlePlayerLeave = useCallback((data: { playerId: string, playerName: string }) => {
    setPlayers(prev => prev.filter(p => p.id !== data.playerId));
    setMessages(prev => [
      ...prev,
      {
        id: `system_${Date.now()}`,
        playerId: 'system',
        playerName: 'Système',
        content: `${data.playerName} a quitté la partie`,
        timestamp: Date.now()
      }
    ]);
  }, []);

  const handlePlayerReady = useCallback((data: { playerId: string, isReady: boolean }) => {
    setPlayers(prev => 
      prev.map(p => 
        p.id === data.playerId 
          ? { ...p, isReady: data.isReady }
          : p
      )
    );
  }, []);

  const handleChatMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleGameSettings = useCallback((settings: GameSettings) => {
    setGameSettings(settings);
  }, []);

  const handleGameStart = useCallback(() => {
    // La logique de démarrage sera gérée par le composant parent
  }, []);

  const handleError = useCallback((error: { message: string }) => {
    setError(error.message);
    // Effacer l'erreur après 5 secondes
    setTimeout(() => setError(null), 5000);
  }, []);

  // Actions utilisateur
  const setReady = useCallback((ready: boolean) => {
    if (!socket) return;
    socket.emit('player:ready', { gameId, isReady: ready });
    setIsReady(ready);
  }, [socket, gameId]);

  const updateSettings = useCallback((settings: Partial<GameSettings>) => {
    if (!socket || !isHost) return;
    socket.emit('game:settings', { gameId, settings });
  }, [socket, gameId, isHost]);

  const startGame = useCallback(() => {
    if (!socket || !isHost) return;
    socket.emit('game:start', { gameId });
  }, [socket, gameId, isHost]);

  const sendMessage = useCallback((content: string) => {
    if (!socket) return;
    socket.emit('chat:message', { gameId, content });
  }, [socket, gameId]);

  const leaveRoom = useCallback(() => {
    if (!socket) return;
    socket.emit('game:leave', { gameId });
  }, [socket, gameId]);

  const isEveryoneReady = players.length > 0 && players.every(p => p.isReady);

  return {
    players,
    messages,
    gameSettings,
    isReady,
    isHost,
    isEveryoneReady,
    error,
    setReady,
    updateSettings,
    startGame,
    sendMessage,
    leaveRoom
  };
}; 