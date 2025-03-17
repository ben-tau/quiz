import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from '../Tooltip';

// Mock de setTimeout et clearTimeout pour les tests de délai
jest.useFakeTimers();

describe('Tooltip', () => {
  const defaultProps = {
    content: 'Info tooltip',
    children: <button>Hover me</button>,
  };

  beforeEach(() => {
    jest.clearAllTimers();
  });

  // Test du rendu de base
  test('rend le contenu enfant sans le tooltip initialement', () => {
    render(<Tooltip {...defaultProps} />);
    
    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  // Test de l'apparition au survol
  test('affiche le tooltip au survol après le délai', () => {
    render(<Tooltip {...defaultProps} />);
    
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Info tooltip')).toBeInTheDocument();
  });

  // Test de la disparition
  test('masque le tooltip quand la souris quitte l\'élément', () => {
    render(<Tooltip {...defaultProps} />);
    
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    fireEvent.mouseLeave(screen.getByText('Hover me'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  // Test du délai personnalisé
  test('respecte le délai personnalisé', () => {
    render(<Tooltip {...defaultProps} delay={500} />);
    
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  // Test des différents placements
  test.each(['top', 'right', 'bottom', 'left'] as const)(
    'applique les classes correctes pour le placement %s',
    (placement) => {
      render(<Tooltip {...defaultProps} placement={placement} />);
      
      fireEvent.mouseEnter(screen.getByText('Hover me'));
      act(() => {
        jest.advanceTimersByTime(300);
      });
      
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      
      // Vérifie que les classes de placement sont appliquées
      if (placement === 'top') {
        expect(tooltip).toHaveClass('bottom-full');
      } else if (placement === 'bottom') {
        expect(tooltip).toHaveClass('top-full');
      } else if (placement === 'left') {
        expect(tooltip).toHaveClass('right-full');
      } else if (placement === 'right') {
        expect(tooltip).toHaveClass('left-full');
      }
    }
  );

  // Test de l'accessibilité au focus
  test('gère correctement le focus quand showOnFocus est true', () => {
    render(<Tooltip {...defaultProps} showOnFocus={true} />);
    
    fireEvent.focus(screen.getByText('Hover me'));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    fireEvent.blur(screen.getByText('Hover me'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('ne réagit pas au focus quand showOnFocus est false', () => {
    render(<Tooltip {...defaultProps} showOnFocus={false} />);
    
    fireEvent.focus(screen.getByText('Hover me'));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  // Test des classes personnalisées
  test('accepte des classes personnalisées', () => {
    const customClass = 'custom-class';
    const customTooltipClass = 'custom-tooltip-class';
    
    render(
      <Tooltip
        {...defaultProps}
        className={customClass}
        tooltipClassName={customTooltipClass}
      />
    );
    
    expect(screen.getByText('Hover me').parentElement).toHaveClass(customClass);
    
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(screen.getByRole('tooltip')).toHaveClass(customTooltipClass);
  });
}); 