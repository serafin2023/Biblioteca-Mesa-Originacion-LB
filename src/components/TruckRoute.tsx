import React, { useState, useEffect } from 'react';
import { RoleKey, RouteType, SchemeKey, ViewMode } from '../types';
import { ROLES, SCHEMES, TBD } from '../data/sustainabilityData';

interface TruckRouteProps {
  view: ViewMode;
  currentScheme: SchemeKey;
  route: RouteType;
  onRouteChange: (route: RouteType) => void;
}

export const TruckRoute: React.FC<TruckRouteProps> = ({
  view,
  currentScheme,
  route,
  onRouteChange,
}) => {
  const scheme = SCHEMES[currentScheme];
  const viewData = scheme[view];
  const stopsData = route === 'plant' ? viewData.plant : viewData.direct;
  const isViaPlant = route === 'plant';

  const [isNarrow, setIsNarrow] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width:560px)').matches;
    }
    return false;
  });

  const [truckX, setTruckX] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrow(window.matchMedia('(max-width:560px)').matches);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const coords = isNarrow
    ? { campo: 60, planta: 200, puerto: 340 }
    : { campo: 110, planta: 450, puerto: 790 };

  // Animate truck position
  useEffect(() => {
    // Start at campo then slide to target stop
    setTruckX(coords.campo);
    const timer = setTimeout(() => {
      setTruckX(isViaPlant ? coords.planta : coords.puerto - (isNarrow ? 40 : 60));
    }, 50);
    return () => clearTimeout(timer);
  }, [route, isViaPlant, isNarrow, coords.campo, coords.planta, coords.puerto]);

  const portTitle =
    currentScheme === 'epa' || currentScheme === 'bs'
      ? 'Industria / puerto'
      : 'Puerto';

  const stopNames: Record<string, [string, string]> = {
    campo: ['Campo', 'salida'],
    planta: ['Planta LB', 'recepción'],
    puerto: [portTitle, 'descarga'],
  };

  // Collect roles used in this itinerary
  const usedRoles = new Set<RoleKey>();
  (['campo', 'planta', 'puerto'] as const).forEach((key) => {
    const actions = stopsData[key];
    if (actions) {
      actions.forEach(([role]) => usedRoles.add(role));
    }
  });

  return (
    <section aria-labelledby="h-ruta">
      <div className="step-label">
        <span className="n">3</span>
        <div>
          <h2 id="h-ruta">Recorrido del camión</h2>
        </div>
      </div>

      <div className="toggle" role="group" aria-label="Recorrido">
        <button
          type="button"
          id="r-direct"
          aria-pressed={route === 'direct'}
          onClick={() => onRouteChange('direct')}
        >
          Directo a puerto
        </button>
        <button
          type="button"
          id="r-plant"
          aria-pressed={route === 'plant'}
          onClick={() => onRouteChange('plant')}
        >
          Pasa por una planta LB
        </button>
      </div>

      {/* Interactive Road SVG */}
      <div className="roadbox">
        <svg
          id="road"
          viewBox={isNarrow ? '0 0 400 190' : '0 0 900 190'}
          role="img"
          aria-label="Recorrido del camión"
        >
          {/* Main Road */}
          <path
            d={`M${coords.campo} 140 H${coords.puerto}`}
            stroke="var(--road)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M${coords.campo + 20} 140 H${coords.puerto - 20}`}
            stroke="var(--road-mark)"
            strokeWidth="2.5"
            strokeDasharray="14 12"
            fill="none"
          />

          {/* Plant turnout path */}
          {isViaPlant ? (
            <path
              d={`M${coords.planta} 129 V108`}
              stroke="var(--road)"
              strokeWidth="10"
              fill="none"
            />
          ) : (
            <text
              x={coords.planta}
              y="178"
              textAnchor="middle"
              fontSize="13"
              fill="var(--muted)"
              fontFamily="Outfit,sans-serif"
            >
              sin paso por planta
            </text>
          )}

          {/* Waypoint 1: Campo */}
          <g>
            <circle
              cx={coords.campo}
              cy="70"
              r="34"
              fill="var(--bg)"
              stroke="var(--teal)"
              strokeWidth="3"
            />
            <g stroke="var(--hi)" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d={`M${coords.campo - 16} 86 Q${coords.campo - 16} 64 ${coords.campo - 4} 56`} />
              <path d={`M${coords.campo} 86 V52`} />
              <path d={`M${coords.campo + 16} 86 Q${coords.campo + 16} 64 ${coords.campo + 4} 56`} />
            </g>
            <g fill="var(--hi)">
              <ellipse cx={coords.campo - 8} cy="62" rx="5" ry="3" />
              <ellipse cx={coords.campo + 8} cy="62" rx="5" ry="3" />
              <ellipse cx={coords.campo} cy="50" rx="3" ry="5" />
            </g>
            <text
              x={coords.campo}
              y="22"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--ink)"
              fontFamily="Outfit,sans-serif"
            >
              Campo
            </text>
          </g>

          {/* Waypoint 2: Planta LB */}
          <g>
            <circle
              cx={coords.planta}
              cy="70"
              r="34"
              fill={isViaPlant ? 'var(--bg)' : 'var(--surface)'}
              stroke={isViaPlant ? 'var(--teal)' : 'var(--line)'}
              strokeWidth="3"
            />
            <g
              fill="none"
              stroke={isViaPlant ? 'var(--teal)' : 'var(--line)'}
              strokeWidth="3"
              strokeLinejoin="round"
            >
              <rect x={coords.planta - 20} y="58" width="14" height="28" rx="2" />
              <rect x={coords.planta - 3} y="52" width="14" height="34" rx="2" />
              <path d={`M${coords.planta - 20} 58 L${coords.planta - 13} 50 L${coords.planta - 6} 58`} />
              <path d={`M${coords.planta - 3} 52 L${coords.planta + 4} 44 L${coords.planta + 11} 52`} />
              <path d={`M${coords.planta + 14} 86 V66 H${coords.planta + 22} V86`} />
            </g>
            <text
              x={coords.planta}
              y="22"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={isViaPlant ? 'var(--ink)' : 'var(--muted)'}
              fontFamily="Outfit,sans-serif"
            >
              Planta LB
            </text>
          </g>

          {/* Waypoint 3: Puerto / Industria */}
          <g>
            <circle
              cx={coords.puerto}
              cy="70"
              r="34"
              fill="var(--bg)"
              stroke="var(--teal)"
              strokeWidth="3"
            />
            <g
              fill="none"
              stroke="var(--teal)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d={`M${coords.puerto - 22} 76 H${coords.puerto + 22} L${coords.puerto + 14} 88 H${coords.puerto - 14} Z`}
              />
              <path d={`M${coords.puerto - 10} 76 V60 H${coords.puerto + 8} V76`} />
              <path d={`M${coords.puerto} 60 V50`} />
              <path
                d={`M${coords.puerto - 24} 92 Q${coords.puerto - 18} 88 ${coords.puerto - 12} 92 T${coords.puerto} 92 T${coords.puerto + 12} 92 T${coords.puerto + 24} 92`}
              />
            </g>
            <text
              x={coords.puerto}
              y="22"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--ink)"
              fontFamily="Outfit,sans-serif"
            >
              {portTitle}
            </text>
          </g>

          {/* Animated Truck */}
          <g
            id="truck"
            style={{
              transform: `translate(${truckX}px, 137px)`,
            }}
          >
            {/* Cargo Box */}
            <rect x="-34" y="-18" width="44" height="22" rx="3" fill="var(--teal)" />
            {/* Lime Cargo Accent */}
            <rect x="-30" y="-14" width="36" height="14" rx="2" fill="var(--lime)" />
            {/* Cab */}
            <path d="M12 -12 H24 L32 -2 V4 H12 Z" fill="var(--teal)" />
            {/* Windshield */}
            <rect x="16" y="-9" width="7" height="6" rx="1" fill="var(--bg)" />
            {/* Wheels */}
            <circle cx="-22" cy="7" r="5" fill="var(--ink)" />
            <circle cx="-6" cy="7" r="5" fill="var(--ink)" />
            <circle cx="22" cy="7" r="5" fill="var(--ink)" />
          </g>
        </svg>
      </div>

      {/* Role Legend */}
      <div className="legend" id="legend">
        {Array.from(usedRoles).map((role) => (
          <span key={role} className={`who ${role}`}>
            {ROLES[role]}
          </span>
        ))}
      </div>

      {/* Stops description cards */}
      <div className="stops" id="stops">
        {scheme.validate && (
          <div className="alert">
            <span className="badge-val">validar</span>
            <span>
              Este esquema depende de los requisitos de cada comprador. Los pasos son orientativos y deben confirmarse con Trading.
            </span>
          </div>
        )}

        {(['campo', 'planta', 'puerto'] as const).map((st) => {
          const stepList = stopsData[st];
          if (!stepList || stepList.length === 0) return null;

          return (
            <div key={st} className="stop">
              <div className="where">
                {stopNames[st][0]}
                <small>{stopNames[st][1]}</small>
              </div>

              <ol>
                {stepList.map(([whoRole, actionText, owner], i) => (
                  <li key={i}>
                    <span className={`who ${whoRole}`}>{ROLES[whoRole]}</span>
                    <span className="t">
                      <span dangerouslySetInnerHTML={{ __html: actionText }} />
                      {owner && owner !== TBD && (
                        <span className="owner">Responsable: {owner}</span>
                      )}
                      {owner === TBD && (
                        <span className="owner tbd">A definir</span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
};
