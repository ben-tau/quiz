import { Link, useNavigate, useLocation } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation de connexion
    localStorage.setItem('isAuthenticated', 'true')
    navigate(from, { replace: true })
  }

  return (
    <div className="container-app min-h-screen flex flex-col">
      <header className="py-6">
        <Link to="/" className="flex items-center gap-3 w-fit">
          <div className="bg-secondary w-10 h-10 rounded flex items-center justify-center text-2xl shadow-lg">
            🧠
          </div>
          <span className="text-2xl font-extrabold text-white">BrainBattle</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="card w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded bg-dark-bg border border-white/20 focus:border-secondary outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2">Mot de passe</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded bg-dark-bg border border-white/20 focus:border-secondary outline-none"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Se connecter
            </button>
          </form>
          <p className="mt-4 text-center">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-secondary hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default LoginPage 