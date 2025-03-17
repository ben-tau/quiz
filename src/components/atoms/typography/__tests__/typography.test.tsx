import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '../Heading';
import Text from '../Text';
import Link from '../Link';

describe('Typography Components', () => {
  describe('Heading Component', () => {
    it('renders h1 by default', () => {
      render(<Heading>Test Heading</Heading>);
      const heading = screen.getByText('Test Heading');
      expect(heading.tagName).toBe('H1');
    });

    it('renders correct heading level', () => {
      render(<Heading level={3}>Test Heading</Heading>);
      const heading = screen.getByText('Test Heading');
      expect(heading.tagName).toBe('H3');
    });

    it('applies custom className', () => {
      render(<Heading className="custom-class">Test Heading</Heading>);
      expect(screen.getByText('Test Heading')).toHaveClass('custom-class');
    });
  });

  describe('Text Component', () => {
    it('renders body variant by default', () => {
      render(<Text>Test Text</Text>);
      const text = screen.getByText('Test Text');
      expect(text).toHaveClass('text-base');
    });

    it('renders small variant', () => {
      render(<Text variant="small">Test Text</Text>);
      const text = screen.getByText('Test Text');
      expect(text).toHaveClass('text-sm');
    });

    it('renders caption variant', () => {
      render(<Text variant="caption">Test Text</Text>);
      const text = screen.getByText('Test Text');
      expect(text).toHaveClass('text-xs');
    });

    it('applies custom className', () => {
      render(<Text className="custom-class">Test Text</Text>);
      expect(screen.getByText('Test Text')).toHaveClass('custom-class');
    });
  });

  describe('Link Component', () => {
    it('renders inline variant by default', () => {
      render(<Link href="#">Test Link</Link>);
      const link = screen.getByText('Test Link');
      expect(link).toHaveClass('text-secondary');
    });

    it('renders button variant', () => {
      render(<Link href="#" variant="button">Test Link</Link>);
      const link = screen.getByText('Test Link');
      expect(link).toHaveClass('border', 'border-secondary');
    });

    it('adds external link attributes', () => {
      render(<Link href="#" external>Test Link</Link>);
      const link = screen.getByText('Test Link', { exact: false });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('shows external icon for inline external links', () => {
      render(<Link href="#" external>Test Link</Link>);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Link href="#" className="custom-class">Test Link</Link>);
      expect(screen.getByText('Test Link')).toHaveClass('custom-class');
    });
  });
}); 