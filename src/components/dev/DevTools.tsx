import React, { useState, useEffect } from 'react';
import { DevPanel } from './DevPanel';
import { DEV_MODE } from '../../config/dev';

export const DevTools: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!DEV_MODE) {
    return null;
  }

  return (
    <>
      {/* Bouton flottant avec tooltip indiquant le raccourci */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-all z-[9999] group"
        title="Ouvrir le panneau développeur (Ctrl+Alt+D)"
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">🛠️</span>
      </button>

      {/* Le panneau de développement */}
      {isVisible && <DevPanel onClose={() => setIsVisible(false)} />}
    </>
  );
}; 