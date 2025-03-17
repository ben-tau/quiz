import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { cn } from '@/lib/utils';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  initialFocus?: React.RefObject<HTMLElement>;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

// Composant Header
interface HeaderProps {
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, onClose, className }) => (
  <div className={cn('flex items-center justify-between p-4 border-b border-gray-700', className)}>
    <h2 className="text-lg font-semibold text-gray-100">{children}</h2>
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-label="Fermer"
      >
        <IoClose className="w-6 h-6" />
      </button>
    )}
  </div>
);

// Composant Body
interface BodyProps {
  children: React.ReactNode;
  className?: string;
}

const Body: React.FC<BodyProps> = ({ children, className }) => (
  <div className={cn('p-4', className)}>
    {children}
  </div>
);

// Composant Footer
interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ children, className }) => (
  <div className={cn('flex justify-end gap-2 p-4 border-t border-gray-700', className)}>
    {children}
  </div>
);

const Modal: React.FC<ModalProps> & {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
} = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
  initialFocus,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Gestion de la touche Escape
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, closeOnEsc]);

  // Gestion du focus
  useEffect(() => {
    if (!isOpen) return;

    const focusElement = initialFocus?.current || modalRef.current;
    if (focusElement) {
      focusElement.focus();
    }

    // Désactiver le scroll du body
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialFocus]);

  // Gestion du clic sur l'overlay
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          onClick={handleOverlayClick}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'relative w-full mx-4',
              'bg-gray-800 rounded-lg shadow-xl',
              'focus:outline-none',
              sizeStyles[size],
              className
            )}
            tabIndex={-1}
          >
            {title && (
              <Header onClose={onClose}>{title}</Header>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal; 