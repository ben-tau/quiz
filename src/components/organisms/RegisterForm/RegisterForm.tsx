import { FC, useState, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Checkbox } from '../../atoms/Checkbox';
import { Icon } from '../../atoms/Icon/Icon';
import { PasswordStrength } from '../../molecules/PasswordStrength/PasswordStrength';

/**
 * Props du composant RegisterForm
 * @property {(data: { username: string, email: string, password: string, acceptTerms: boolean }) => void} onSubmit - Callback de soumission
 * @property {boolean} [isLoading] - État de chargement du formulaire
 * @property {string} [error] - Message d'erreur à afficher
 * @property {() => void} [onLogin] - Callback pour le lien de connexion
 * @property {string} [className] - Classes CSS additionnelles
 */
interface RegisterFormProps {
  onSubmit: (data: {
    username: string;
    email: string;
    password: string;
    acceptTerms: boolean;
  }) => void;
  isLoading?: boolean;
  error?: string;
  onLogin?: () => void;
  className?: string;
}

/**
 * Composant RegisterForm - Formulaire d'inscription
 */
export const RegisterForm: FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onLogin,
  className
}) => {
  // État du formulaire
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  // État des erreurs de validation
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: ''
  });

  // Validation du formulaire
  const validateForm = (): boolean => {
    const errors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: ''
    };

    // Validation du nom d'utilisateur
    if (!formData.username.trim()) {
      errors.username = 'Le nom d\'utilisateur est requis';
    } else if (formData.username.length < 3) {
      errors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    }

    // Validation de l'email
    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'L\'email n\'est pas valide';
    }

    // Validation du mot de passe
    if (!formData.password) {
      errors.password = 'Le mot de passe est requis';
    }

    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Validation des conditions d'utilisation
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }

    setValidationErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  // Gestion de la soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...submitData } = formData;
      onSubmit(submitData);
    }
  };

  // Mémoisation du composant PasswordStrength pour éviter les re-renders inutiles
  const passwordStrengthComponent = useMemo(() => (
    <PasswordStrength
      password={formData.password}
      className="mt-2"
    />
  ), [formData.password]);

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

      {/* Champ nom d'utilisateur */}
      <div className="space-y-2">
        <Input
          type="text"
          label="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          error={validationErrors.username}
          icon="user"
          required
        />
      </div>

      {/* Champ email */}
      <div className="space-y-2">
        <Input
          type="email"
          label="Adresse email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={validationErrors.email}
          icon="mail"
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
        {passwordStrengthComponent}
      </div>

      {/* Champ confirmation mot de passe */}
      <div className="space-y-2">
        <Input
          type="password"
          label="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={validationErrors.confirmPassword}
          icon="lock"
          required
        />
      </div>

      {/* Conditions d'utilisation */}
      <div className="space-y-2">
        <Checkbox
          label={
            <span className="text-sm">
              J'accepte les{' '}
              <a
                href="/terms"
                className="text-secondary hover:text-accent-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                conditions d'utilisation
              </a>
            </span>
          }
          checked={formData.acceptTerms}
          onChange={(checked) => setFormData({ ...formData, acceptTerms: checked })}
          error={validationErrors.acceptTerms}
        />
      </div>

      {/* Bouton d'inscription */}
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        className="w-full bg-gradient-to-r from-secondary to-accent-2"
      >
        Créer un compte
      </Button>

      {/* Lien de connexion */}
      {onLogin && (
        <p className="text-center text-sm text-white/60">
          Déjà un compte ?{' '}
          <button
            type="button"
            onClick={onLogin}
            className="text-accent hover:underline font-medium"
          >
            Se connecter
          </button>
        </p>
      )}
    </form>
  );
}; 