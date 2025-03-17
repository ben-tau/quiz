import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="container-app">
      <header className="flex justify-between items-center py-6">
        <div className="flex items-center gap-3">
          <div className="bg-secondary w-10 h-10 rounded flex items-center justify-center text-2xl shadow-lg">
            🧠
          </div>
          <span className="text-2xl font-extrabold text-white">BrainBattle</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="btn btn-secondary">
            Connexion
          </Link>
          <Link to="/register" className="btn btn-primary">
            Inscription
          </Link>
        </div>
      </header>

      <main>
        <section className="text-center py-20">
          <h1 className="text-white mb-4">
            Affrontez vos amis dans des batailles de connaissances !
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Créez des quiz personnalisés, défiez vos amis en temps réel et découvrez qui est le vrai champion parmi vous.
          </p>
          <Link to="/register" className="btn btn-accent text-xl px-8 py-4">
            Commencer l'aventure
          </Link>
        </section>

        <section className="grid grid-cols-3 gap-8 py-12">
          <div className="card text-center">
            <div className="text-5xl mb-5">🎮</div>
            <h3 className="text-xl font-bold mb-3">Défiez vos amis</h3>
            <p>Créez des parties personnalisées et invitez jusqu'à 10 amis pour des duels intellectuels palpitants.</p>
          </div>
          <div className="card text-center">
            <div className="text-5xl mb-5">🧩</div>
            <h3 className="text-xl font-bold mb-3">Questions variées</h3>
            <p>Des milliers de questions dans de nombreux thèmes pour tester vos connaissances et celles de vos amis.</p>
          </div>
          <div className="card text-center">
            <div className="text-5xl mb-5">🏆</div>
            <h3 className="text-xl font-bold mb-3">Montez sur le podium</h3>
            <p>Accumulez des points, répondez rapidement et visez la première place dans un classement dynamique.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 mt-12">
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

export default HomePage 