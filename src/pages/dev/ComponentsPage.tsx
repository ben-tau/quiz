import React from 'react';

const ComponentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-8">
          Bibliothèque de Composants
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Liste des composants à venir */}
          <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">En développement</h2>
            <p className="text-slate-400">
              La bibliothèque de composants est en cours de construction. 
              Revenez bientôt pour voir tous les composants disponibles !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage; 