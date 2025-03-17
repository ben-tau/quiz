import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import ProtectedRoute from './components/routing/ProtectedRoute'
import { DevTools } from './components/dev/DevTools'

// Pages publiques
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ComponentsPage from './pages/dev/ComponentsPage'

// Pages protégées
import DashboardPage from './pages/home/DashboardPage'
import CreateGamePage from './pages/game/CreateGamePage'
import GameLobbyPage from './pages/game/GameLobbyPage'
import GamePlayPage from './pages/game/GamePlayPage'
import GameResultsPage from './pages/game/GameResultsPage'

// Layout de base qui inclut le DevTools
const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <DevTools />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout><RootLayout /></BaseLayout>,
    children: [
      // Routes publiques
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'components',
        element: <ComponentsPage />
      },

      // Routes protégées
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'create-game',
        element: (
          <ProtectedRoute>
            <CreateGamePage />
          </ProtectedRoute>
        )
      },
      {
        path: 'game/:id/lobby',
        element: (
          <ProtectedRoute>
            <GameLobbyPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'game/:id/play',
        element: (
          <ProtectedRoute>
            <GamePlayPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'game/:id/results',
        element: (
          <ProtectedRoute>
            <GameResultsPage />
          </ProtectedRoute>
        )
      },

      // Redirection par défaut
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]) 