import { v4 as uuidv4 } from 'uuid';

export interface MockQuestion {
  id: string;
  text: string;
  type: 'qcm' | 'text' | 'timeline' | 'drag-n-drop';
  options?: Array<{ id: string; text: string; isCorrect?: boolean }>;
  correctAnswer?: string | string[];
  explanation?: string;
  media?: { type: 'image' | 'audio' | 'video'; url: string };
  difficulty: 1 | 2 | 3 | 4 | 5;
  timeLimit: number;
  points: number;
}

export const mockQuestions: MockQuestion[] = [
  {
    id: uuidv4(),
    text: "Quelle est la capitale de la France ?",
    type: "qcm",
    options: [
      { id: "a", text: "Paris", isCorrect: true },
      { id: "b", text: "Lyon", isCorrect: false },
      { id: "c", text: "Marseille", isCorrect: false },
      { id: "d", text: "Toulouse", isCorrect: false }
    ],
    explanation: "Paris est la capitale de la France depuis 508.",
    difficulty: 1,
    timeLimit: 20,
    points: 100
  },
  {
    id: uuidv4(),
    text: "Quand la Tour Eiffel a-t-elle été construite ?",
    type: "timeline",
    correctAnswer: "1889",
    explanation: "La Tour Eiffel a été construite pour l'Exposition universelle de 1889.",
    media: {
      type: "image",
      url: "/images/tour-eiffel.jpg"
    },
    difficulty: 2,
    timeLimit: 30,
    points: 150
  },
  {
    id: uuidv4(),
    text: "Placez ces événements dans l'ordre chronologique.",
    type: "drag-n-drop",
    options: [
      { id: "a", text: "Première Guerre Mondiale (1914-1918)" },
      { id: "b", text: "Révolution Française (1789)" },
      { id: "c", text: "Chute du mur de Berlin (1989)" },
      { id: "d", text: "Découverte de l'Amérique (1492)" }
    ],
    correctAnswer: ["d", "b", "a", "c"],
    difficulty: 4,
    timeLimit: 45,
    points: 300
  },
  {
    id: uuidv4(),
    text: "Qui a écrit 'Les Misérables' ?",
    type: "text",
    correctAnswer: "Victor Hugo",
    explanation: "Les Misérables est un roman de Victor Hugo publié en 1862.",
    media: {
      type: "image",
      url: "/images/victor-hugo.jpg"
    },
    difficulty: 2,
    timeLimit: 25,
    points: 150
  }
];

// Générateur de réponses aléatoires pour simuler d'autres joueurs
export const generateRandomAnswer = (question: MockQuestion): {
  isCorrect: boolean;
  answer: string | string[];
  timeSpent: number;
} => {
  const timeSpent = Math.random() * question.timeLimit;
  
  switch (question.type) {
    case 'qcm': {
      const correctOption = question.options?.find(opt => opt.isCorrect);
      const randomCorrect = Math.random() > 0.4; // 60% de chance de bonne réponse
      return {
        isCorrect: randomCorrect,
        answer: randomCorrect ? correctOption?.id || '' : 
          question.options?.[Math.floor(Math.random() * question.options.length)]?.id || '',
        timeSpent
      };
    }
    
    case 'text': {
      const randomCorrect = Math.random() > 0.6; // 40% de chance de bonne réponse
      return {
        isCorrect: randomCorrect,
        answer: randomCorrect ? question.correctAnswer as string : 
          'Réponse incorrecte aléatoire',
        timeSpent
      };
    }
    
    case 'timeline': {
      const randomCorrect = Math.random() > 0.7; // 30% de chance de bonne réponse
      return {
        isCorrect: randomCorrect,
        answer: randomCorrect ? question.correctAnswer as string :
          String(Math.floor(Math.random() * 2000)),
        timeSpent
      };
    }
    
    case 'drag-n-drop': {
      const correctOrder = question.correctAnswer as string[];
      const randomOrder = [...correctOrder].sort(() => Math.random() - 0.5);
      const randomCorrect = Math.random() > 0.8; // 20% de chance de bonne réponse
      return {
        isCorrect: randomCorrect,
        answer: randomCorrect ? correctOrder : randomOrder,
        timeSpent
      };
    }
    
    default:
      return {
        isCorrect: false,
        answer: '',
        timeSpent
      };
  }
};

// Simulation de latence réseau
export const simulateNetworkDelay = async (
  minDelay = 100,
  maxDelay = 800
): Promise<void> => {
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  await new Promise(resolve => setTimeout(resolve, delay));
}; 