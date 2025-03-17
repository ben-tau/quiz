import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  // Test du rendu de base
  it('rend correctement avec le contenu par défaut', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  // Test des variantes
  it('applique les classes CSS correctes pour chaque variante', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-secondary');

    rerender(<Button variant="text">Text</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-secondary');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-500');
  });

  // Test des tailles
  it('applique les classes CSS correctes pour chaque taille', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-sm');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-base');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-lg');
  });

  // Test de l'état désactivé
  it('est désactivé quand isDisabled est true', () => {
    render(<Button isDisabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // Test de l'état de chargement
  it('affiche le spinner de chargement quand isLoading est true', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  // Test de la largeur complète
  it('applique la classe w-full quand fullWidth est true', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  // Test des icônes
  it('rend correctement les icônes à gauche et à droite', () => {
    const IconMock = () => <span data-testid="icon">icon</span>;
    
    render(
      <Button
        leftIcon={<IconMock />}
        rightIcon={<IconMock />}
      >
        With Icons
      </Button>
    );
    
    const icons = screen.getAllByTestId('icon');
    expect(icons).toHaveLength(2);
  });

  // Test du clic
  it('appelle onClick quand cliqué', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 