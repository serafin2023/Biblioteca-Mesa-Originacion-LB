import React from 'react';
import { SchemeKey, ViewMode } from '../types';
import { SCHEMES, VIEW_DATA } from '../data/sustainabilityData';
import { CutlineTimeline } from './CutlineTimeline';

interface MarketSelectorProps {
  view: ViewMode;
  currentScheme: SchemeKey;
  onSchemeChange: (scheme: SchemeKey) => void;
}

export const MarketSelector: React.FC<MarketSelectorProps> = ({
  view,
  currentScheme,
  onSchemeChange,
}) => {
  const currentView = VIEW_DATA[view];
  const scheme = SCHEMES[currentScheme];

  return (
    <section aria-labelledby="h-mk">
      <div className="step-label">
        <span className="n">1</span>
        <div>
          <h2 id="h-mk">{currentView.mk}</h2>
        </div>
      </div>

      <div className="markets" id="markets" role="group" aria-label="Mercado">
        {(Object.entries(SCHEMES) as [SchemeKey, typeof scheme][]).map(([k, m]) => {
          const isSelected = k === currentScheme;
          return (
            <button
              key={k}
              type="button"
              className="mk"
              id={`mk-${k}`}
              aria-pressed={isSelected}
              onClick={() => onSchemeChange(k)}
            >
              <span className="code">{m.code}</span>
              <span className="dest">{m.dest}</span>
              <span className="cut">Corte: {m.cut}</span>
            </button>
          );
        })}
      </div>

      {/* Ficha del mercado */}
      <dl className="ficha" id="ficha">
        {scheme.ficha.map(([term, desc], i) => (
          <div key={i}>
            <dt>{term}</dt>
            <dd>{desc}</dd>
          </div>
        ))}
      </dl>

      {/* Línea de corte */}
      <div className="cutline">
        <h3>¿Desde cuándo tiene que ser agrícola el lote?</h3>
        <p id="cutText">{scheme.cutText}</p>
        <CutlineTimeline
          currentScheme={currentScheme}
          onSelectScheme={onSchemeChange}
        />
      </div>
    </section>
  );
};
