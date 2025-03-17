import { EventEmitter } from 'events';
import { gameStateService } from './gameStateService';
import { BOT_PERSONALITIES, BotPersonality } from '../constants/botPersonalities';

export interface MockSocketServiceOptions {
  networkDelay?: {
    min: number;
    max: number;
  };
  errorRate?: number;
}

export class MockSocketService extends EventEmitter {
  private listeners: Record<string, Function[]> = {};
  private rooms: Record<string, string[]> = {};
  private userId: string;
  private options: MockSocketServiceOptions;
  private bots: Map<string, BotPersonality> = new Map();

  constructor(userId: string, options: MockSocketServiceOptions = {}) {
    super();
    this.userId = userId;
    this.options = {
      networkDelay: { min: 50, max: 300 },
      errorRate: 0.02,
      ...options
    };
  }

  // Méthodes publiques d'accès
  public getUserId(): string {
    return this.userId;
  }

  public getListeners(): Record<string, Function[]> {
    return { ...this.listeners };
  }

  public getRooms(): Record<string, string[]> {
    return { ...this.rooms };
  }

  public getBots(): Map<string, BotPersonality> {
    return new Map(this.bots);
  }

  // Méthodes Socket.IO standard
  emit(event: string, data: any) {
    if (Math.random() < this.options.errorRate) {
      this.simulateError(event);
      return;
    }

    const delay = Math.random() * 
      (this.options.networkDelay.max - this.options.networkDelay.min) + 
      this.options.networkDelay.min;

    setTimeout(() => {
      this.handleEvent(event, data);
    }, delay);
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return this;
  }

  off(event: string, callback?: Function) {
    if (!callback) {
      delete this.listeners[event];
    } else if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
    return this;
  }

  join(room: string) {
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    if (!this.rooms[room].includes(this.userId)) {
      this.rooms[room].push(this.userId);
      this.simulateBotsJoining(room);
    }
    return this;
  }

  // Méthodes de simulation
  private handleEvent(event: string, data: any) {
    switch (event) {
      case 'game:join':
        this.simulatePlayerJoin(data);
        break;
      case 'game:leave':
        this.simulatePlayerLeave(data);
        break;
      case 'game:ready':
        this.simulatePlayerReady(data);
        break;
      case 'game:start':
        this.simulateGameStart(data);
        break;
      case 'game:answer':
        this.simulatePlayerAnswer(data);
        break;
      case 'chat:message':
        this.simulateChatMessage(data);
        break;
    }
  }

  private simulateBotsJoining(gameId: string) {
    const numBots = Math.floor(Math.random() * 3) + 1; // 1-3 bots
    
    for (let i = 0; i < numBots; i++) {
      const botId = `bot_${Date.now()}_${i}`;
      const personality = BOT_PERSONALITIES[Math.floor(Math.random() * BOT_PERSONALITIES.length)];
      
      this.bots.set(botId, personality);
      
      setTimeout(() => {
        this.triggerEvent('player:join', {
          gameId,
          player: {
            id: botId,
            name: `${personality.name}_${Math.floor(Math.random() * 1000)}`,
            isBot: true
          }
        });

        // Simuler le bot qui se met prêt
        this.simulateBotReady(gameId, botId, personality);
      }, Math.random() * 3000 + 1000);
    }
  }

  private simulateBotReady(gameId: string, botId: string, personality: BotPersonality) {
    const readyDelay = personality.getReadyDelay();
    setTimeout(() => {
      this.triggerEvent('player:ready', {
        gameId,
        playerId: botId
      });
    }, readyDelay);
  }

  private simulatePlayerAnswer(data: { gameId: string, questionId: string }) {
    const { gameId, questionId } = data;
    const gameState = gameStateService.loadGameState(gameId);
    
    if (!gameState) return;

    this.bots.forEach((personality, botId) => {
      const delay = personality.getAnswerDelay();
      const accuracy = personality.getAnswerAccuracy();

      setTimeout(() => {
        if (Math.random() < accuracy) {
          this.triggerEvent('game:answer', {
            gameId,
            playerId: botId,
            questionId,
            answer: this.getCorrectAnswer(questionId),
            timeSpent: delay / 1000
          });
        }
      }, delay);
    });
  }

  private simulateError(event: string) {
    const errors = {
      'game:join': 'Failed to join game: Server timeout',
      'game:start': 'Failed to start game: Not enough players',
      'game:answer': 'Failed to submit answer: Invalid response',
      default: 'Network error occurred'
    };

    this.triggerEvent('error', {
      event,
      message: errors[event] || errors.default
    });
  }

  private triggerEvent(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  // Méthodes utilitaires
  private getCorrectAnswer(questionId: string): any {
    // Simulation - à remplacer par la vraie logique
    return Math.random() > 0.5 ? 'A' : 'B';
  }

  // Méthodes de simulation manquantes
  private simulatePlayerJoin(data: { gameId: string }) {
    const { gameId } = data;
    const gameState = gameStateService.loadGameState(gameId);
    if (!gameState) return;

    this.triggerEvent('player:join', {
      gameId,
      player: {
        id: this.userId,
        name: `Player_${this.userId}`,
        isBot: false,
        isReady: false
      }
    });
  }

  private simulatePlayerLeave(data: { gameId: string }) {
    const { gameId } = data;
    this.triggerEvent('player:leave', {
      gameId,
      playerId: this.userId
    });
  }

  private simulatePlayerReady(data: { gameId: string, isReady: boolean }) {
    const { gameId, isReady } = data;
    this.triggerEvent('player:ready', {
      gameId,
      playerId: this.userId,
      isReady
    });
  }

  private simulateGameStart(data: { gameId: string }) {
    const { gameId } = data;
    const gameState = gameStateService.loadGameState(gameId);
    if (!gameState) return;

    this.triggerEvent('game:start', {
      gameId,
      startTime: Date.now()
    });
  }

  private simulateChatMessage(data: { gameId: string, content: string }) {
    const { gameId, content } = data;
    this.triggerEvent('chat:message', {
      gameId,
      message: {
        id: `msg_${Date.now()}`,
        playerId: this.userId,
        content,
        timestamp: Date.now()
      }
    });
  }
} 