import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { IconCopy } from '../Icon/Icon';

interface InviteCodeProps {
  gameCode: string;
  className?: string;
}

/**
 * Composant d'affichage du code d'invitation avec fonction de copie
 * @param {InviteCodeProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant InviteCode
 */
export const InviteCode: React.FC<InviteCodeProps> = ({ gameCode, className }) => {
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(gameCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={twMerge(
        'flex flex-col items-center p-6 mb-8',
        'border border-white/10 rounded-xl',
        'bg-blue-900/20 backdrop-blur-md',
        className
      )}
    >
      <h3 className="text-sm font-semibold mb-2 text-blue-300">
        CODE D'INVITATION
      </h3>
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
          transition: { duration: 2, repeat: Infinity }
        }}
        className="text-3xl font-mono font-bold tracking-wider mb-3 text-white"
      >
        {gameCode}
      </motion.div>
      <button
        onClick={handleCopyCode}
        className="flex items-center gap-2 text-sm py-2 px-4 bg-blue-600/60 hover:bg-blue-600/80 rounded-md transition-colors"
      >
        <span>Copier le code</span>
        <IconCopy size={18} />
      </button>
      {codeCopied && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 text-xs text-green-400"
        >
          Code copié !
        </motion.div>
      )}
    </motion.div>
  );
}; 