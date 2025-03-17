import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation d'inscription
    localStorage.setItem('isAuthenticated', 'true')
    navigate('/dashboard', { replace: true })
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
          <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-2">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 rounded bg-dark-bg border border-white/20 focus:border-secondary outline-none"
                required
              />
            </div>
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
            <div>
              <label htmlFor="confirmPassword" className="block mb-2">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 rounded bg-dark-bg border border-white/20 focus:border-secondary outline-none"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="rounded border-white/20"
                required
              />
              <label htmlFor="terms">
                J'accepte les{' '}
                <Link to="#" className="text-secondary hover:underline">conditions d'utilisation</Link>
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              S'inscrire
            </button>
          </form>
          <p className="mt-4 text-center">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-secondary hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default RegisterPage 