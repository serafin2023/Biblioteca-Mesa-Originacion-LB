import React from 'react';
import { SchemeKey } from '../types';

interface CutlineTimelineProps {
  currentScheme: SchemeKey;
  onSelectScheme?: (scheme: SchemeKey) => void;
}

interface PointDef {
  key: SchemeKey;
  name: string;
  date: string;
  year: number;
  up: boolean;
}

export const CutlineTimeline: React.FC<CutlineTimelineProps> = ({
  currentScheme,
  onSelectScheme,
}) => {
  const x = (year: number) => 40 + ((year - 2006) / (2022 - 2006)) * 820;

  const points: PointDef[] = [
    { key: 'epa', name: 'EPA', date: '19/12/2007', year: 2007.97, up: false },
    { key: 'bs', name: '2BSvs', date: '01/01/2008', year: 2008.0, up: true },
    { key: 'eudr', name: 'EUDR', date: '31/12/2020', year: 2020.99, up: false },
  ];

  const yearTicks: number[] = [];
  for (let y = 2006; y <= 2022; y += 2) {
    yearTicks.push(y);
  }

  return (
    <>
      <svg
        className="cutsvg"
        viewBox="0 0 900 96"
        role="img"
        aria-label="Fechas de corte de cada esquema"
      >
        {/* Main timeline axis line */}
        <line
          x1="40"
          x2="860"
          y1="56"
          y2="56"
          stroke="var(--line)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Year tick marks and text */}
        {yearTicks.map((y) => (
          <g key={y}>
            <line
              x1={x(y)}
              x2={x(y)}
              y1="51"
              y2="61"
              stroke="var(--line)"
              strokeWidth="2"
            />
            <text
              x={x(y)}
              y="88"
              textAnchor="middle"
              fontSize="13"
              fill="var(--muted)"
              fontFamily="Outfit, sans-serif"
            >
              {y}
            </text>
          </g>
        ))}

        {/* Scheme cutoff point nodes */}
        {points.map(({ key, name, date, year, up }) => {
          const isActive = key === currentScheme;
          const cx = x(year);
          const ty = up ? 34 : 22;

          return (
            <g
              key={key}
              className="cursor-pointer"
              onClick={() => onSelectScheme?.(key)}
            >
              <circle
                cx={cx}
                cy="56"
                r={isActive ? 9 : 6}
                fill={isActive ? 'var(--hi)' : 'var(--muted)'}
                className="transition-all"
              />
              <text
                x={up ? cx + 14 : cx - 14}
                y={ty}
                textAnchor={up ? 'start' : 'end'}
                fontSize={isActive ? 15 : 13}
                fontWeight={isActive ? 700 : 500}
                fill={isActive ? 'var(--ink)' : 'var(--muted)'}
                fontFamily="Outfit, sans-serif"
              >
                {name} · {date}
              </text>
            </g>
          );
        })}

        {/* Indicator if "Sin cláusula" is active */}
        {currentScheme === 'comun' && (
          <text
            x="450"
            y="22"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--ink)"
            fontFamily="Outfit, sans-serif"
          >
            Soja sin cláusula: sin fecha de corte
          </text>
        )}
      </svg>

      {/* Mobile fallback chip list */}
      <div className="cutlist">
        {points.map(({ key, name, date }) => (
          <span
            key={key}
            className={`cursor-pointer ${key === currentScheme ? 'on' : ''}`}
            onClick={() => onSelectScheme?.(key)}
          >
            {name} · {date}
          </span>
        ))}
        {currentScheme === 'comun' && (
          <span className="on">Sin cláusula · sin fecha de corte</span>
        )}
      </div>
    </>
  );
};
