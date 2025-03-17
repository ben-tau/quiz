import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Checkbox } from '../../atoms/Checkbox';
import { Icon } from '../../atoms/Icon/Icon';

/**
 * Props du composant LoginForm
 * @property {(data: { username: string, password: string, rememberMe: boolean }) => void} onSubmit - Callback de soumission
 * @property {boolean} [isLoading] - État de chargement du formulaire
 * @property {string} [error] - Message d'erreur à afficher
 * @property {() => void} [onForgotPassword] - Callback pour le lien "Mot de passe oublié"
 * @property {() => void} [onRegister] - Callback pour le lien d'inscription
 * @property {string} [className] - Classes CSS additionnelles
 */
interface LoginFormProps {
  onSubmit: (data: { username: string; password: string; rememberMe: boolean }) => void;
  isLoading?: boolean;
  error?: string;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  className?: string;
}

/**
 * Composant LoginForm - Formulaire de connexion
 */
export const LoginForm: FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onForgotPassword,
  onRegister,
  className
}) => {
  // État du formulaire
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  // État des erreurs de validation
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: ''
  });

  // Validation du formulaire
  const validateForm = (): boolean => {
    const errors = {
      username: '',
      password: ''
    };

    if (!formData.username.trim()) {
      errors.username = 'Le nom d\'utilisateur est requis';
    }

    if (!formData.password) {
      errors.password = 'Le mot de passe est requis';
    }

    setValidationErrors(errors);
    return !errors.username && !errors.password;
  };

  // Gestion de la soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge(
        'w-full max-w-md mx-auto',
        'bg-dark-bg/70 backdrop-blur-sm',
        'p-8 rounded-lg border border-white/10',
        'space-y-6',
        className
      )}
    >
      {/* Message d'erreur global */}
      {error && (
        <div className={twMerge(
          'bg-error/10 text-error',
          'p-3 rounded-lg',
          'flex items-center gap-2',
          'border-l-4 border-error'
        )}>
          <Icon name="alert-circle" className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Champ username/email */}
      <div className="space-y-2">
        <Input
          type="text"
          label="Nom d'utilisateur ou email"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          error={validationErrors.username}
          icon="user"
          required
        />
      </div>

      {/* Champ mot de passe */}
      <div className="space-y-2">
        <Input
          type="password"
          label="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={validationErrors.password}
          icon="lock"
          required
        />
      </div>

      {/* Options de connexion */}
      <div className="flex items-center justify-between">
        <Checkbox
          label="Se souvenir de moi"
          checked={formData.rememberMe}
          onChange={(checked) => setFormData({ ...formData, rememberMe: checked })}
        />
        {onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            className={twMerge(
              'text-sm text-secondary hover:text-accent-2',
              'transition-colors duration-200'
            )}
          >
            Mot de passe oublié ?
          </button>
        )}
      </div>

      {/* Bouton de connexion */}
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        className="w-full bg-gradient-to-r from-secondary to-accent-2"
      >
        Se connecter
      </Button>

      {/* Lien d'inscription */}
      {onRegister && (
        <p className="text-center text-sm text-white/60">
          Pas encore de compte ?{' '}
          <button
            type="button"
            onClick={onRegister}
            className="text-accent hover:underline font-medium"
          >
            Créer un compte
          </button>
        </p>
      )}
    </form>
  );
}; 