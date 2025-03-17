export interface BotPersonality {
  name: string;
  answerSpeed: 'very-fast' | 'fast' | 'medium' | 'slow' | 'very-slow';
  accuracy: 'very-high' | 'high' | 'medium' | 'low' | 'very-low';
  readySpeed: 'very-fast' | 'fast' | 'medium' | 'slow' | 'very-slow';
  getAnswerDelay: () => number;
  getReadyDelay: () => number;
  getAnswerAccuracy: () => number;
}

const createBotPersonality = (
  name: string,
  answerSpeed: BotPersonality['answerSpeed'],
  accuracy: BotPersonality['accuracy'],
  readySpeed: BotPersonality['readySpeed']
): BotPersonality => {
  const getSpeedDelay = (speed: string): number => {
    const delays = {
      'very-fast': { min: 1000, max: 2000 },
      'fast': { min: 2000, max: 3500 },
      'medium': { min: 3500, max: 5000 },
      'slow': { min: 5000, max: 7000 },
      'very-slow': { min: 7000, max: 10000 }
    };
    const range = delays[speed];
    return Math.random() * (range.max - range.min) + range.min;
  };

  const getAccuracyRate = (acc: string): number => {
    const rates = {
      'very-high': 0.95,
      'high': 0.8,
      'medium': 0.6,
      'low': 0.4,
      'very-low': 0.2
    };
    return rates[acc];
  };

  return {
    name,
    answerSpeed,
    accuracy,
    readySpeed,
    getAnswerDelay: () => getSpeedDelay(answerSpeed),
    getReadyDelay: () => getSpeedDelay(readySpeed),
    getAnswerAccuracy: () => getAccuracyRate(accuracy)
  };
};

export const BOT_PERSONALITIES: BotPersonality[] = [
  createBotPersonality('Expert', 'fast', 'very-high', 'medium'),
  createBotPersonality('Casual', 'medium', 'medium', 'slow'),
  createBotPersonality('Distrait', 'slow', 'low', 'very-slow'),
  createBotPersonality('Compétitif', 'very-fast', 'high', 'fast'),
  createBotPersonality('Réfléchi', 'slow', 'high', 'medium'),
  createBotPersonality('Impulsif', 'very-fast', 'low', 'very-fast')
]; 