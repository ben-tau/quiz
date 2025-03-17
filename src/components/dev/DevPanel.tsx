import React from 'react';
import { mockUsers } from '../../data/mockUsers';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface DevPanelProps {
  onClose: () => void;
}

export const DevPanel: React.FC<DevPanelProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleQuickLogin = async (user: typeof mockUsers[0]) => {
    try {
      const loginResult = await authService.login({ 
        email: user.email, 
        password: user.password 
      });
      
      if (loginResult) {
        toast.success(`Connecté en tant que ${user.username}`, {
          duration: 3000,
          position: 'bottom-center',
        });
        
        onClose();
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const loggedUser = authService.getCurrentUser();
        if (loggedUser) {
          navigate('/dashboard', { replace: true });
        } else {
          toast.error('Erreur: Utilisateur non connecté après login');
        }
      }
    } catch (error) {
      toast.error(`Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Déconnexion réussie');
      onClose();
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(`Erreur de déconnexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  };

  const handleShowComponents = () => {
    onClose();
    navigate('/components');
  };

  return (
    <div className="fixed bottom-24 right-4 bg-slate-800/95 text-white rounded-xl shadow-2xl z-[9999] w-96 backdrop-blur-sm border border-slate-700 transform translate-y-0 hover:translate-y-0 transition-transform">
      <div className="flex flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛠️</span>
            <h3 className="text-lg font-semibold text-blue-400">
              Panneau Développeur
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-700"
          >
            ✕
          </button>
        </div>

        {/* Components Button */}
        <button
          onClick={handleShowComponents}
          className="w-full px-4 py-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-all flex items-center gap-3 group border border-blue-500/20"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">📚</span>
          <span className="text-blue-400 font-medium">Voir tous les composants</span>
        </button>

        {/* Current User */}
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/20">
          <h4 className="text-sm font-medium text-slate-400 mb-2">Utilisateur actuel</h4>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-blue-400">
              {currentUser?.username || 'Aucun utilisateur'}
            </p>
            {currentUser?.role && (
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                {currentUser.role}
              </span>
            )}
          </div>
        </div>

        {/* User List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-400 mb-3">Connexion rapide</h4>
          {mockUsers.map(user => (
            <div
              key={user.id}
              className="w-full p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all flex items-center justify-between gap-2 border border-slate-600/20"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    {user.username}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-600/50 text-slate-400">
                    {user.role}
                  </span>
                </div>
                <span className="text-xs text-slate-400">{user.email}</span>
              </div>
              <button
                onClick={() => handleQuickLogin(user)}
                className="px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors flex items-center gap-1"
              >
                <span>👤</span>
                Connecter
              </button>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        {currentUser && (
          <button
            onClick={handleLogout}
            className="w-full mt-2 px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all font-medium flex items-center justify-center gap-2 border border-red-500/20"
          >
            <span>🚪</span>
            Déconnexion
          </button>
        )}
      </div>
    </div>
  );
}; 