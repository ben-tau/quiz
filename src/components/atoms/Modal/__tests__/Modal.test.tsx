import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

// Mock de createPortal pour les tests
const mockPortal = jest.fn((element) => element);
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element: React.ReactNode) => mockPortal(element),
}));

describe('Modal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    document.body.style.overflow = '';
  });

  // Test du rendu de base
  test('ne rend pas le contenu quand isOpen est false', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div>Contenu test</div>
      </Modal>
    );
    
    expect(screen.queryByText('Contenu test')).not.toBeInTheDocument();
  });

  test('rend le contenu quand isOpen est true', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Contenu test</div>
      </Modal>
    );
    
    expect(screen.getByText('Contenu test')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // Test du titre
  test('affiche le titre quand il est fourni', () => {
    render(
      <Modal isOpen={true} onClose={onClose} title="Titre test">
        <div>Contenu test</div>
      </Modal>
    );
    
    expect(screen.getByText('Titre test')).toBeInTheDocument();
  });

  // Test des sous-composants
  test('rend correctement les sous-composants', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <Modal.Header>Titre header</Modal.Header>
        <Modal.Body>Contenu body</Modal.Body>
        <Modal.Footer>Contenu footer</Modal.Footer>
      </Modal>
    );
    
    expect(screen.getByText('Titre header')).toBeInTheDocument();
    expect(screen.getByText('Contenu body')).toBeInTheDocument();
    expect(screen.getByText('Contenu footer')).toBeInTheDocument();
  });

  // Test de la fermeture avec Escape
  test('appelle onClose quand Escape est pressé et closeOnEsc est true', () => {
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEsc={true}>
        <div>Contenu test</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('n\'appelle pas onClose quand Escape est pressé et closeOnEsc est false', () => {
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEsc={false}>
        <div>Contenu test</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  // Test du clic sur l'overlay
  test('appelle onClose au clic sur l\'overlay quand closeOnOverlayClick est true', () => {
    render(
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={true}>
        <div>Contenu test</div>
      </Modal>
    );
    
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('n\'appelle pas onClose au clic sur l\'overlay quand closeOnOverlayClick est false', () => {
    render(
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={false}>
        <div>Contenu test</div>
      </Modal>
    );
    
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  // Test des différentes tailles
  test.each(['sm', 'md', 'lg'] as const)(
    'applique correctement la classe de taille %s',
    (size) => {
      render(
        <Modal isOpen={true} onClose={onClose} size={size}>
          <div>Contenu test</div>
        </Modal>
      );
      
      const sizeClassMap = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
      };
      
      const modal = screen.getByRole('dialog').querySelector('[tabindex="-1"]');
      expect(modal).toHaveClass(sizeClassMap[size]);
    }
  );

  // Test du scroll du body
  test('désactive le scroll du body quand la modal est ouverte', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Contenu test</div>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('réactive le scroll du body quand la modal est fermée', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Contenu test</div>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(
      <Modal isOpen={false} onClose={onClose}>
        <div>Contenu test</div>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe('unset');
  });

  // Test des classes personnalisées
  test('accepte des classes personnalisées', () => {
    const customClass = 'custom-class';
    render(
      <Modal isOpen={true} onClose={onClose} className={customClass}>
        <div>Contenu test</div>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog').querySelector('[tabindex="-1"]');
    expect(modal).toHaveClass(customClass);
  });

  // Test de l'accessibilité
  test('a les attributs d\'accessibilité appropriés', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Contenu test</div>
      </Modal>
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
}); 