import { useState } from 'react';

interface Theme {
  id: string;
  name: string;
  selected: boolean;
}

interface GameSettings {
  themes: Theme[];
  questionsCount: number;
  timePerQuestion: number;
  randomOrder: boolean;
}

export const useGameSettings = () => {
  const [settings, setSettings] = useState<GameSettings>({
    themes: [
      { id: 'history', name: 'Histoire', selected: false },
      { id: 'geography', name: 'Géographie', selected: false },
      { id: 'science', name: 'Sciences', selected: false },
      { id: 'cinema', name: 'Cinéma', selected: false },
      { id: 'literature', name: 'Littérature', selected: false },
      { id: 'general', name: 'Culture Générale', selected: false }
    ],
    questionsCount: 10,
    timePerQuestion: 30,
    randomOrder: true
  });

  const updateSettings = (key: keyof GameSettings, value: any) => {
    if (key === 'themes') {
      setSettings(prev => ({
        ...prev,
        themes: prev.themes.map(theme => 
          theme.id === value ? { ...theme, selected: !theme.selected } : theme
        )
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  return { settings, updateSettings };
}; 