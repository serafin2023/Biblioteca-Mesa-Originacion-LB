import React from 'react';
import { ViewMode } from '../types';
import { VIEW_DATA } from '../data/sustainabilityData';

interface HeroProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const Hero: React.FC<HeroProps> = ({ view, onViewChange }) => {
  const currentView = VIEW_DATA[view];

  return (
    <section className="hero">
      <h1 dangerouslySetInnerHTML={{ __html: currentView.heroT }} />
      <p>{currentView.heroP}</p>
      
      <div className="views" role="group" aria-label="Vista">
        <button
          type="button"
          className="vw"
          id="v-com"
          aria-pressed={view === 'com'}
          onClick={() => onViewChange('com')}
        >
          <b>Comerciales</b>
          <span>Atención al cliente y cierre de la venta</span>
        </button>

        <button
          type="button"
          className="vw"
          id="v-pla"
          aria-pressed={view === 'pla'}
          onClick={() => onViewChange('pla')}
        >
          <b>Logística y plantas</b>
          <span>Gestión del camión, la descarga y el despacho</span>
        </button>
      </div>
    </section>
  );
};
