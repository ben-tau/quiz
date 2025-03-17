import '@testing-library/jest-dom';

// Ajout de configurations globales pour les tests si nécessaire
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})); 