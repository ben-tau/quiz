import './index.css'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DevPanel } from './components/dev/DevPanel/DevPanel';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppRoutes />
      <DevPanel />
    </BrowserRouter>
  );
};
