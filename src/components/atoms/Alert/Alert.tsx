import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoInformationCircle, IoCheckmarkCircle, IoWarning, IoCloseCircle } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/lib/utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  title?: string;
  icon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles = {
  info: {
    container: 'border-blue-800 bg-blue-950/50',
    icon: 'text-blue-400',
    title: 'text-blue-300',
    text: 'text-blue-200',
  },
  success: {
    container: 'border-green-800 bg-green-950/50',
    icon: 'text-green-400',
    title: 'text-green-300',
    text: 'text-green-200',
  },
  warning: {
    container: 'border-yellow-800 bg-yellow-950/50',
    icon: 'text-yellow-400',
    title: 'text-yellow-300',
    text: 'text-yellow-200',
  },
  error: {
    container: 'border-red-800 bg-red-950/50',
    icon: 'text-red-400',
    title: 'text-red-300',
    text: 'text-red-200',
  },
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
  info: IoInformationCircle,
  success: IoCheckmarkCircle,
  warning: IoWarning,
  error: IoCloseCircle,
};

const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  icon = true,
  dismissible = false,
  onDismiss,
  className,
}) => {
  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={twMerge(
          'relative flex gap-3 rounded-lg border p-4 backdrop-blur-sm',
          styles.container,
          className
        )}
        role="alert"
      >
        {icon && (
          <div className="flex-shrink-0">
            <Icon className={cn('h-5 w-5', styles.icon)} aria-hidden="true" />
          </div>
        )}

        <div className="flex-grow">
          {title && (
            <h3 className={twMerge('text-lg font-semibold mb-2', styles.title)}>
              {title}
            </h3>
          )}
          <div className={twMerge('text-sm', styles.text)}>
            {children}
          </div>
        </div>

        {dismissible && (
          <button
            type="button"
            className={cn(
              'absolute right-2 top-2 rounded-lg p-1.5',
              'hover:bg-opacity-20 hover:bg-gray-900',
              'focus:outline-none focus:ring-2 focus:ring-opacity-50',
              styles.text
            )}
            onClick={onDismiss}
            aria-label="Fermer"
          >
            <IoClose className="h-4 w-4" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert; 