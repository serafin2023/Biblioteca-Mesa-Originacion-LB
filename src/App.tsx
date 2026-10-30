import React, { useState, useEffect } from 'react';
import { RouteType, SchemeKey, ViewMode } from './types';
import { SCHEMES } from './data/sustainabilityData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarketSelector } from './components/MarketSelector';
import { Checklist } from './components/Checklist';
import { TruckRoute } from './components/TruckRoute';
import { Contacts } from './components/Contacts';
import { SummaryModal } from './components/SummaryModal';
import { FileText } from 'lucide-react';

export const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('com');
  const [currentScheme, setCurrentScheme] = useState<SchemeKey>('eudr');
  const [route, setRoute] = useState<RouteType>('direct');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [theme, setTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Apply data-theme to root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // When view changes, reset answers
  const handleViewChange = (newView: ViewMode) => {
    setView(newView);
    setAnswers({});
  };

  // When scheme changes, reset answers
  const handleSchemeChange = (newScheme: SchemeKey) => {
    setCurrentScheme(newScheme);
    setAnswers({});
  };

  // Answer a question
  const handleAnswer = (index: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // Reset checklist
  const handleResetChecklist = () => {
    setAnswers({});
  };

  // Set all questions to qualification answer
  const handleSetAllOk = () => {
    const questions = SCHEMES[currentScheme][view].qs;
    const allOk: Record<number, number> = {};
    questions.forEach((q, idx) => {
      allOk[idx] = typeof q === 'string' ? 1 : q.ok;
    });
    setAnswers(allOk);
  };

  return (
    <div className="wrap">
      <Header
        theme={theme}
        onThemeChange={setTheme}
        onOpenSummary={() => setIsSummaryOpen(true)}
      />

      <Hero view={view} onViewChange={handleViewChange} />

      <MarketSelector
        view={view}
        currentScheme={currentScheme}
        onSchemeChange={handleSchemeChange}
      />

      <Checklist
        view={view}
        currentScheme={currentScheme}
        answers={answers}
        onAnswer={handleAnswer}
        onReset={handleResetChecklist}
        onSetAllOk={handleSetAllOk}
      />

      <TruckRoute
        view={view}
        currentScheme={currentScheme}
        route={route}
        onRouteChange={setRoute}
      />

      <Contacts view={view} />

      <div className="flex justify-between items-center flex-wrap gap-4 pt-2">
        <button
          type="button"
          onClick={() => setIsSummaryOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--ink)] border border-[var(--line)] font-medium text-sm transition-colors cursor-pointer"
        >
          <FileText size={16} className="text-[var(--teal)]" />
          <span>Generar ficha de resumen para compartir</span>
        </button>
      </div>

      <p className="foot">
        Guía interna de referencia, octubre 2026. EUDR según Reglamento (UE) 2023/1115 y Protocolo VISEC (nov. 2025).{' '}
        <span className="badge-val">validar</span> indica requisitos que dependen de cada comprador y deben confirmarse con Trading. Los responsables indicados como "a definir" se designarán en la reunión de lanzamiento del programa.
      </p>

      <SummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        view={view}
        currentScheme={currentScheme}
        route={route}
        answers={answers}
      />
    </div>
  );
};

export default App;
