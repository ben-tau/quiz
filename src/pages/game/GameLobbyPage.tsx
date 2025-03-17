import { Link } from 'react-router-dom'

const GameLobbyPage = () => {
  // Simulation des participants
  const participants = [
    { name: 'Thomas', initial: 'T', isHost: true, isReady: true },
    { name: 'Alice', initial: 'A', isHost: false, isReady: true },
    { name: 'Bob', initial: 'B', isHost: false, isReady: false },
  ]

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

      <main className="max-w-2xl mx-auto">
        <div className="card text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">Salle d'attente</h1>
          <div className="bg-dark-bg/50 rounded p-4 mb-6">
            <p className="text-lg mb-2">Code d'invitation</p>
            <div className="flex items-center justify-center gap-4">
              <code className="text-2xl font-mono bg-dark-bg px-4 py-2 rounded">
                ABC123
              </code>
              <button className="btn btn-secondary">
                📋 Copier
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-dark-bg/30 rounded p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {participant.initial}
                  </div>
                  <span className="font-semibold">
                    {participant.name}
                    {participant.isHost && (
                      <span className="ml-2 text-accent text-sm">👑 Hôte</span>
                    )}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  participant.isReady ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {participant.isReady ? 'Prêt' : 'En attente'}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Link to="/dashboard" className="btn btn-secondary">
              Annuler
            </Link>
            <Link to="/game/123/play" className="btn btn-primary">
              Lancer la partie
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GameLobbyPage 