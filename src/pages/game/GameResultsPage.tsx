import { Link } from 'react-router-dom'

const GameResultsPage = () => {
  // Simulation des résultats
  const results = [
    { name: 'Alice', initial: 'A', score: 1850, correctAnswers: 18, averageTime: 5.2 },
    { name: 'Thomas', initial: 'T', score: 1620, correctAnswers: 16, averageTime: 6.8 },
    { name: 'Bob', initial: 'B', score: 1340, correctAnswers: 13, averageTime: 8.1 }
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🎉 Partie terminée !</h1>
          <p className="text-xl text-white/60">Voici les résultats de cette bataille de connaissances</p>
        </div>

        <div className="flex justify-center gap-8 mb-16">
          {results.slice(0, 3).map((player, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index === 0 ? 'order-2 scale-110' : index === 1 ? 'order-1' : 'order-3'
              }`}
            >
              <div className="text-4xl mb-4">
                {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div className="card w-48 text-center p-6">
                <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {player.initial}
                </div>
                <h3 className="font-bold mb-2">{player.name}</h3>
                <p className="text-2xl font-bold text-accent mb-2">
                  {player.score} pts
                </p>
                <div className="text-sm text-white/60">
                  <p>{player.correctAnswers}/20 correctes</p>
                  <p>{player.averageTime}s en moyenne</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/dashboard" className="btn btn-secondary">
            Retour à l'accueil
          </Link>
          <Link to="/create-game" className="btn btn-primary">
            Nouvelle partie
          </Link>
        </div>
      </main>
    </div>
  )
}

export default GameResultsPage 