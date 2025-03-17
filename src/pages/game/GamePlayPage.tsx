import { Link } from 'react-router-dom'

const GamePlayPage = () => {
  // Simulation d'une question
  const question = {
    text: "En quelle année la première Coupe du Monde de football a-t-elle eu lieu ?",
    type: "qcm",
    options: ["1926", "1930", "1934", "1938"],
    timeLeft: 15,
    currentQuestion: 1,
    totalQuestions: 20
  }

  // Simulation des joueurs
  const players = [
    { name: 'Thomas', initial: 'T', hasAnswered: true },
    { name: 'Alice', initial: 'A', hasAnswered: false },
    { name: 'Bob', initial: 'B', hasAnswered: true }
  ]

  return (
    <div className="container-app">
      <header className="py-6 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="bg-secondary w-10 h-10 rounded flex items-center justify-center text-2xl shadow-lg">
            🧠
          </div>
          <span className="text-2xl font-extrabold text-white">BrainBattle</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Question {question.currentQuestion}/{question.totalQuestions}</span>
          <div className="w-32 h-2 bg-dark-bg/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary rounded-full"
              style={{ width: `${(question.currentQuestion / question.totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold">⏱️ {question.timeLeft}s</span>
            <span className="px-3 py-1 bg-secondary/20 rounded-full text-secondary text-sm">
              Histoire
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-8 text-center">
            {question.text}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                className="card hover:ring-2 hover:ring-secondary transition-all p-6 text-center text-lg font-medium"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {players.map((player, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-2 transition-all ${
                player.hasAnswered ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {player.initial}
              </div>
              <span className="text-sm font-medium">{player.name}</span>
              {player.hasAnswered && (
                <span className="text-green-400 text-2xl">✓</span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default GamePlayPage 