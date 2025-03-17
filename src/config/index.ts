export const APP_CONFIG = {
  name: 'BrainBattle',
  description: 'Quiz en temps réel',
  version: '1.0.0',
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  routes: {
    home: '/',
    quiz: '/quiz',
    leaderboard: '/leaderboard',
    profile: '/profile',
  },
} as const; 