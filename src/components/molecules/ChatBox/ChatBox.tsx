import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'system';
  author?: string;
  content: string;
  time: string;
  isCurrentUser?: boolean;
}

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  className?: string;
}

/**
 * Composant de chat en temps réel pour la salle d'attente
 * @param {ChatBoxProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant ChatBox
 */
export const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  onSendMessage,
  className
}) => {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Défilement automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    onSendMessage(messageInput);
    setMessageInput('');
  };

  return (
    <div
      className={twMerge(
        'flex flex-col h-64',
        'bg-gray-900/60 border border-white/10 rounded-lg overflow-hidden',
        className
      )}
    >
      {/* Zone des messages */}
      <div className="flex-1 p-3 overflow-y-auto">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={twMerge(
                'mb-2',
                msg.type === 'system' && 'text-blue-400 text-xs italic'
              )}
            >
              {msg.type !== 'system' && (
                <span
                  className={twMerge(
                    'font-bold',
                    msg.isCurrentUser ? 'text-blue-400' : 'text-purple-400'
                  )}
                >
                  {msg.author}:
                </span>
              )}
              <span className="ml-2">{msg.content}</span>
              <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Zone de saisie */}
      <div className="border-t border-white/10 p-2">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            maxLength={200}
            placeholder="Écrivez un message..."
            className={twMerge(
              'flex-1 bg-gray-800',
              'border border-white/10 rounded-l-md',
              'px-3 py-2',
              'placeholder:text-gray-500',
              'focus:outline-none focus:border-blue-500'
            )}
          />
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className={twMerge(
              'bg-blue-600 px-4 rounded-r-md',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-opacity'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}; 