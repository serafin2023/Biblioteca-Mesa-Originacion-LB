import React from 'react';
import { ViewMode } from '../types';
import { TBD, VIEW_DATA } from '../data/sustainabilityData';

interface ContactsProps {
  view: ViewMode;
}

export const Contacts: React.FC<ContactsProps> = ({ view }) => {
  const currentView = VIEW_DATA[view];

  return (
    <section aria-labelledby="h-ct">
      <div className="step-label">
        <span className="n">?</span>
        <div>
          <h2 id="h-ct">Consultas y responsables</h2>
        </div>
      </div>

      <div className="contacts" id="contacts">
        {currentView.contacts.map(([color, taskLabel, personName], idx) => {
          const isTBD = personName === TBD;
          return (
            <div
              key={idx}
              className="ct"
              style={{ '--c': color } as React.CSSProperties}
            >
              <span className="k">{taskLabel}</span>
              <span className={`v ${isTBD ? 'tbd' : ''}`}>
                {isTBD ? 'Responsable a definir' : personName}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
