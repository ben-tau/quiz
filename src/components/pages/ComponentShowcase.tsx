import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Icon } from '../atoms/Icon/Icon';
import { Card } from '../atoms/Card';
import { Alert } from '../atoms/Alert';
import { Modal } from '../atoms/Modal';
import { ProgressBar } from '../atoms/ProgressBar';
import { Spinner } from '../atoms/Spinner';
import { Toggle } from '../atoms/Toggle';
import { Tooltip } from '../atoms/Tooltip';
import { ThemeCard } from '../molecules/ThemeCard';
import { PlayerCard } from '../molecules/PlayerCard';
import { PasswordStrength } from '../molecules/PasswordStrength';
import { LoginForm } from '../organisms/LoginForm';
import { RegisterForm } from '../organisms/RegisterForm';
import { ThemesGrid } from '../organisms/ThemesGrid';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

interface ComponentSection {
  id: string;
  title: string;
  components: {
    name: string;
    description: string;
    component: React.ReactNode;
    props?: Record<string, string>;
  }[];
}

const ComponentShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState('atoms');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProps, setSelectedProps] = useState<Record<string, any>>({});

  const sections: ComponentSection[] = [
    {
      id: 'atoms',
      title: 'Composants Atomiques',
      components: [
        {
          name: 'Button',
          description: 'Bouton avec différentes variantes et états',
          component: (
            <div className="space-y-4">
              <div className="space-x-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="space-x-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="space-x-4">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button icon="plus">Avec Icône</Button>
              </div>
            </div>
          ),
          props: {
            variant: 'primary | secondary | outline | danger',
            size: 'sm | md | lg',
            isLoading: 'boolean',
            disabled: 'boolean',
            icon: 'string',
            onClick: '() => void'
          }
        },
        {
          name: 'Input',
          description: 'Champ de saisie avec validation et états',
          component: (
            <div className="space-y-4 max-w-md">
              <Input placeholder="Input standard" />
              <Input placeholder="Avec erreur" error="Message d'erreur" />
              <Input placeholder="Désactivé" disabled />
              <Input placeholder="Avec icône" icon="search" />
            </div>
          ),
          props: {
            placeholder: 'string',
            value: 'string',
            onChange: '(e: ChangeEvent) => void',
            error: 'string',
            disabled: 'boolean',
            icon: 'string'
          }
        },
        // Autres composants atomiques...
      ]
    },
    {
      id: 'molecules',
      title: 'Composants Moléculaires',
      components: [
        {
          name: 'ThemeCard',
          description: 'Carte affichant un thème de quiz',
          component: (
            <div className="w-64">
              <ThemeCard
                name="Histoire"
                icon="book"
                questionsCount={50}
                difficulty={2}
                isSelected={false}
                onClick={() => {}}
              />
            </div>
          ),
          props: {
            name: 'string',
            icon: 'string',
            questionsCount: 'number',
            difficulty: '1 | 2 | 3',
            isSelected: 'boolean',
            onClick: '() => void'
          }
        },
        // Autres composants moléculaires...
      ]
    },
    {
      id: 'organisms',
      title: 'Composants Organismiques',
      components: [
        {
          name: 'LoginForm',
          description: 'Formulaire de connexion complet',
          component: (
            <div className="max-w-md bg-dark-bg/50 p-6 rounded-lg">
              <LoginForm
                onSubmit={() => {}}
                isLoading={false}
                onForgotPassword={() => {}}
                onRegister={() => {}}
              />
            </div>
          ),
          props: {
            onSubmit: '(data: LoginData) => void',
            isLoading: 'boolean',
            error: 'string',
            onForgotPassword: '() => void',
            onRegister: '() => void'
          }
        },
        // Autres composants organismiques...
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Navigation latérale */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-dark-bg/95 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Composants</h1>
        <div className="space-y-6">
          {sections.map(section => (
            <div key={section.id}>
              <button
                className={`w-full text-left py-2 px-4 rounded transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary/20 text-primary'
                    : 'hover:bg-gray-800'
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </button>
              {activeSection === section.id && (
                <div className="ml-4 mt-2 space-y-2">
                  {section.components.map(component => (
                    <a
                      key={component.name}
                      href={`#${section.id}-${component.name}`}
                      className="block py-1 px-4 text-sm text-gray-400 hover:text-white"
                    >
                      {component.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="ml-64 p-8">
        {sections.map(section => (
          <section
            key={section.id}
            className={activeSection === section.id ? '' : 'hidden'}
          >
            <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
            <div className="space-y-12">
              {section.components.map(component => (
                <div
                  key={component.name}
                  id={`${section.id}-${component.name}`}
                  className="bg-dark-bg/50 rounded-lg p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold mb-2">{component.name}</h3>
                  <p className="text-gray-400 mb-6">{component.description}</p>

                  {/* Aperçu du composant */}
                  <div className="bg-dark-bg/50 rounded-lg p-6 mb-6">
                    {component.component}
                  </div>

                  {/* Documentation des props */}
                  {component.props && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-4">Props disponibles</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(component.props).map(([prop, type]) => (
                          <div
                            key={prop}
                            className="bg-dark-bg/30 p-4 rounded-lg"
                          >
                            <code className="text-primary">{prop}</code>
                            <p className="text-sm text-gray-400 mt-1">{type}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ComponentShowcase; 