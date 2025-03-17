import { Link } from 'react-router-dom'

const CreateGamePage = () => {
  return (
    <div className="container-app">
      <header className="py-6">
        <Link to="/dashboard" className="flex items-center gap-3 w-fit">
          <div className="bg-secondary w-10 h-10 rounded flex items-center justify-center text-2xl shadow-lg">
            🧠
          </div>
          <span className="text-2xl font-extrabold text-white">BrainBattle</span>
        </Link>
      </header>

      <main>
        <h1 className="text-2xl font-bold mb-8">Créer une partie</h1>
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Sélectionnez vos thèmes</h2>
          <div className="grid grid-cols-3 gap-5">
            {[
              { icon: '🏛️', name: 'Histoire', count: 154, selected: true },
              { icon: '🎬', name: 'Cinéma', count: 208, selected: true },
              { icon: '🔬', name: 'Sciences', count: 172, selected: true },
              { icon: '🌍', name: 'Géographie', count: 143, selected: true },
              { icon: '📚', name: 'Littérature', count: 112, selected: true },
              { icon: '🎭', name: 'Culture Générale', count: 247, selected: true },
            ].map((theme, index) => (
              <button
                key={index}
                className={`card text-center aspect-square flex flex-col items-center justify-center relative overflow-hidden transition-all ${
                  theme.selected ? 'ring-2 ring-secondary' : 'opacity-50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent-2/10 -z-10" />
                <div className="text-4xl mb-4">{theme.icon}</div>
                <h3 className="font-bold mb-1">{theme.name}</h3>
                <p className="text-accent text-sm">{theme.count} questions</p>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Questions disponibles: 1036</p>
              <p className="text-sm text-white/60">Minimum requis: 20 questions</p>
            </div>
            <div className="flex gap-4">
              <Link to="/dashboard" className="btn btn-secondary">
                Annuler
              </Link>
              <Link to="/game/123/lobby" className="btn btn-primary">
                Créer la partie
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CreateGamePage 