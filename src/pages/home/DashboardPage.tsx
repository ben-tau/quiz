import { Link } from 'react-router-dom'

const DashboardPage = () => {
  // Simulation d'un utilisateur connecté
  const user = {
    name: 'Thomas',
    initial: 'T'
  }

  return (
    <div className="container-app">
      <header className="flex justify-between items-center py-6">
        <div className="flex items-center gap-3">
          <div className="bg-secondary w-10 h-10 rounded flex items-center justify-center text-2xl shadow-lg">
            🧠
          </div>
          <span className="text-2xl font-extrabold text-white">BrainBattle</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center font-bold">
            {user.initial}
          </div>
          <span className="font-semibold">{user.name}</span>
        </div>
      </header>

      <main>
        <section className="text-center py-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full -z-10 opacity-50" />
          <h1 className="text-white mb-4">
            Bienvenue, {user.name} !
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Prêt à défier vos amis dans une bataille de connaissances ?
          </p>
          <Link 
            to="/create-game"
            className="btn btn-accent text-xl px-8 py-4 inline-flex items-center gap-3 animate-pulse"
          >
            <span>🎮</span>
            Créer une partie
          </Link>
        </section>

        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-center text-2xl font-bold mb-8 relative inline-block left-1/2 -translate-x-1/2">
            Comment jouer
          </h2>
          <div className="grid grid-cols-3 gap-5">
            <div className="card">
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent-2 flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div className="text-4xl mb-4 text-center">🎲</div>
              <h3 className="text-lg font-bold mb-2 text-center">Créez une partie</h3>
              <p className="text-sm text-center text-white/70">
                Choisissez vos thèmes préférés et définissez les paramètres du jeu selon vos envies.
              </p>
            </div>
            <div className="card">
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent-2 flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div className="text-4xl mb-4 text-center">👥</div>
              <h3 className="text-lg font-bold mb-2 text-center">Invitez des amis</h3>
              <p className="text-sm text-center text-white/70">
                Partagez le code d'invitation pour que vos amis puissent rejoindre la partie.
              </p>
            </div>
            <div className="card">
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent-2 flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div className="text-4xl mb-4 text-center">🏆</div>
              <h3 className="text-lg font-bold mb-2 text-center">Affrontez-vous</h3>
              <p className="text-sm text-center text-white/70">
                Répondez aux questions et découvrez qui est le plus cultivé parmi vous !
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-8">Thèmes disponibles</h2>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: '🏛️', name: 'Histoire', count: 154 },
              { icon: '🎬', name: 'Cinéma', count: 208 },
              { icon: '🔬', name: 'Sciences', count: 172 },
              { icon: '🌍', name: 'Géographie', count: 143 },
              { icon: '📚', name: 'Littérature', count: 112 },
              { icon: '🎭', name: 'Culture Générale', count: 247 },
            ].map((theme, index) => (
              <div key={index} className="card text-center aspect-square flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent-2/10 -z-10" />
                <div className="text-4xl mb-4">{theme.icon}</div>
                <h3 className="font-bold mb-1">{theme.name}</h3>
                <p className="text-accent text-sm">{theme.count} questions</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="flex justify-between items-center">
          <div className="text-white/60">© 2025 BrainBattle</div>
          <div className="flex gap-5">
            <Link to="#" className="text-white/60 hover:text-white">À propos</Link>
            <Link to="#" className="text-white/60 hover:text-white">Contact</Link>
            <Link to="#" className="text-white/60 hover:text-white">Conditions d'utilisation</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DashboardPage 