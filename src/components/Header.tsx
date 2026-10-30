import React from 'react';
import { LOGO_LIGHT, LOGO_DARK } from '../assets/logos';
import { Sun, Moon, Monitor } from 'lucide-react';

interface HeaderProps {
  theme: 'auto' | 'light' | 'dark';
  onThemeChange: (theme: 'auto' | 'light' | 'dark') => void;
  onOpenSummary?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onThemeChange }) => {
  return (
    <header className="top">
      <div className="flex items-center gap-4">
        <img className="logo-light" src={LOGO_LIGHT} alt="La Bragadense" />
        <img className="logo-dark" src={LOGO_DARK} alt="La Bragadense" />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <span className="tag">Programa de Sustentabilidad y Trazabilidad</span>

        {/* Theme mode selector */}
        <div className="inline-flex items-center bg-[var(--surface)] border border-[var(--line)] rounded-full p-1 gap-1 text-xs">
          <button
            type="button"
            title="Tema automático del sistema"
            onClick={() => onThemeChange('auto')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 font-medium transition-colors ${
              theme === 'auto'
                ? 'bg-[var(--teal)] text-white shadow-xs'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Monitor size={13} />
            <span className="hidden sm:inline">Auto</span>
          </button>
          <button
            type="button"
            title="Tema claro"
            onClick={() => onThemeChange('light')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 font-medium transition-colors ${
              theme === 'light'
                ? 'bg-[var(--teal)] text-white shadow-xs'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Sun size={13} />
            <span className="hidden sm:inline">Claro</span>
          </button>
          <button
            type="button"
            title="Tema oscuro"
            onClick={() => onThemeChange('dark')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-[var(--teal)] text-white shadow-xs'
                : 'text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Moon size={13} />
            <span className="hidden sm:inline">Oscuro</span>
          </button>
        </div>
      </div>
    </header>
  );
};
