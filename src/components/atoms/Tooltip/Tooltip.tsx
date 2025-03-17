import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  className?: string;
  tooltipClassName?: string;
  showOnFocus?: boolean;
}

const placementStyles: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
};

const arrowStyles: Record<TooltipPlacement, string> = {
  top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-dark-bg border-x-transparent border-b-transparent',
  right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-dark-bg border-y-transparent border-l-transparent',
  bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-dark-bg border-x-transparent border-t-transparent',
  left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-dark-bg border-y-transparent border-r-transparent',
};

export const Tooltip = ({
  children,
  content,
  placement = 'top',
  delay = 300,
  className,
  tooltipClassName,
  showOnFocus = true,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className={cn('relative inline-block', className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showOnFocus ? showTooltip : undefined}
      onBlur={showOnFocus ? hideTooltip : undefined}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 px-2 py-1',
              'bg-dark-bg bg-opacity-90 text-white',
              'rounded border border-secondary border-opacity-20',
              'text-sm whitespace-nowrap',
              placementStyles[placement],
              tooltipClassName
            )}
          >
            {content}
            <div
              className={cn(
                'absolute w-0 h-0',
                'border-[6px]',
                arrowStyles[placement]
              )}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip; 