import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  // Test du rendu par défaut
  test('rend correctement avec les props par défaut', () => {
    render(
      <Card>
        <Card.Body>Contenu test</Card.Body>
      </Card>
    );
    
    expect(screen.getByText('Contenu test')).toBeInTheDocument();
  });

  // Test des variantes
  test.each(['default', 'interactive', 'outline'] as const)(
    'rend correctement avec la variante %s',
    (variant) => {
      const { container } = render(
        <Card variant={variant}>
          <Card.Body>Contenu test</Card.Body>
        </Card>
      );
      
      // Vérifie que la classe de la variante est appliquée
      if (variant === 'default') {
        expect(container.firstChild).toHaveClass('bg-dark-bg');
      } else if (variant === 'interactive') {
        expect(container.firstChild).toHaveClass('hover:shadow-lg');
      } else if (variant === 'outline') {
        expect(container.firstChild).toHaveClass('border-2');
      }
    }
  );

  // Test de l'interactivité
  test('déclenche onClick quand cliqué', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick}>
        <Card.Body>Contenu cliquable</Card.Body>
      </Card>
    );
    
    fireEvent.click(screen.getByText('Contenu cliquable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test des sous-composants
  test('rend correctement avec tous les sous-composants', () => {
    render(
      <Card>
        <Card.Header>En-tête test</Card.Header>
        <Card.Body>Corps test</Card.Body>
        <Card.Footer>Pied test</Card.Footer>
      </Card>
    );
    
    expect(screen.getByText('En-tête test')).toBeInTheDocument();
    expect(screen.getByText('Corps test')).toBeInTheDocument();
    expect(screen.getByText('Pied test')).toBeInTheDocument();
  });

  // Test des classes personnalisées
  test('accepte et applique les classes personnalisées', () => {
    const { container } = render(
      <Card className="test-class">
        <Card.Body className="body-class">Contenu test</Card.Body>
      </Card>
    );
    
    expect(container.firstChild).toHaveClass('test-class');
    expect(screen.getByText('Contenu test').parentElement).toHaveClass('body-class');
  });

  // Test des bordures des sous-composants
  test('applique correctement les bordures aux sous-composants', () => {
    const { container } = render(
      <Card>
        <Card.Header>En-tête</Card.Header>
        <Card.Body>Corps</Card.Body>
        <Card.Footer>Pied</Card.Footer>
      </Card>
    );
    
    const header = screen.getByText('En-tête').parentElement;
    const footer = screen.getByText('Pied').parentElement;
    
    expect(header).toHaveClass('border-b');
    expect(footer).toHaveClass('border-t');
  });
}); 