import { Navigate, useLocation } from 'react-router-dom'

// Simulation d'un état d'authentification (à remplacer par votre logique d'auth)
const useAuth = () => {
  // TODO: Implémenter la vraie logique d'authentification
  return {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true'
  }
}

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute 