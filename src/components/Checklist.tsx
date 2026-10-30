import React from 'react';
import { SchemeKey, ViewMode } from '../types';
import { SCHEMES, VIEW_DATA } from '../data/sustainabilityData';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface ChecklistProps {
  view: ViewMode;
  currentScheme: SchemeKey;
  answers: Record<number, number>;
  onAnswer: (index: number, value: number) => void;
  onReset: () => void;
  onSetAllOk: () => void;
}

export const Checklist: React.FC<ChecklistProps> = ({
  view,
  currentScheme,
  answers,
  onAnswer,
  onReset,
  onSetAllOk,
}) => {
  const currentView = VIEW_DATA[view];
  const scheme = SCHEMES[currentScheme];
  const viewSchemeData = scheme[view];

  // Normalize questions to { q: string, ok: number }
  const questions = viewSchemeData.qs.map((item) =>
    typeof item === 'string' ? { q: item, ok: 1 } : item
  );

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  // Find questions answered contrary to required qualification
  const failedQuestions = questions
    .map((item, index) => ({
      ...item,
      answeredVal: answers[index],
    }))
    .filter(
      (item) => item.answeredVal !== undefined && item.answeredVal !== item.ok
    );

  const hasFailures = failedQuestions.length > 0;
  const isComplete = answeredCount === totalQuestions;

  return (
    <section aria-labelledby="h-chk">
      <div className="step-label">
        <span className="n">2</span>
        <div>
          <h2 id="h-chk">{currentView.chk}</h2>
          <p className="sub" id="chkSub">
            {currentView.chkSub} Esquema: {scheme.code}.
          </p>
        </div>
      </div>

      <div className="check">
        <div className="qs" id="qs">
          {/* Quick actions toolbar */}
          <div className="flex items-center justify-between gap-2 pb-1 text-xs">
            <span className="text-[var(--muted)] font-medium">
              Progreso: {answeredCount} de {totalQuestions}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onSetAllOk}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[var(--teal)] hover:bg-[var(--accent-soft)] transition-colors font-medium border border-[var(--line)]"
                title="Marcar todas las respuestas requeridas"
              >
                <CheckCircle2 size={13} />
                <span>Cumple todo</span>
              </button>
              {answeredCount > 0 && (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[var(--muted)] hover:text-[var(--bad)] hover:bg-[var(--surface-2)] transition-colors font-medium border border-[var(--line)]"
                  title="Reiniciar respuestas"
                >
                  <RotateCcw size={13} />
                  <span>Limpiar</span>
                </button>
              )}
            </div>
          </div>

          {questions.map((item, i) => {
            const currentAnswer = answers[i];
            const isYesSelected = currentAnswer === 1;
            const isNoSelected = currentAnswer === 0;

            return (
              <div key={i} className="q">
                <span>{item.q}</span>
                <span className="yn">
                  <button
                    type="button"
                    className={item.ok === 1 ? 'si' : 'no'}
                    id={`q${i}-si`}
                    aria-pressed={isYesSelected}
                    onClick={() => onAnswer(i, 1)}
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    className={item.ok === 0 ? 'si' : 'no'}
                    id={`q${i}-no`}
                    aria-pressed={isNoSelected}
                    onClick={() => onAnswer(i, 0)}
                  >
                    No
                  </button>
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic reactive verdict card */}
        <div
          className={`verdict ${
            hasFailures ? 'bad' : isComplete ? '' : 'pending'
          }`}
          id="verdict"
          aria-live="polite"
        >
          {hasFailures ? (
            <>
              <div className="flex items-center gap-2">
                <XCircle size={26} className="shrink-0" />
                <div className="big">
                  {view === 'com'
                    ? `Aún no califica como ${scheme.code}`
                    : `No ingresa como ${scheme.code}`}
                </div>
              </div>
              <ul className="space-y-1">
                {failedQuestions.map((fq, idx) => (
                  <li key={idx}>
                    {fq.q.replace(/^[¿\s]+|[?\s]+$/g, '')}:{' '}
                    <strong>{fq.answeredVal === 1 ? 'sí' : 'no'}</strong>
                  </li>
                ))}
              </ul>
              <div className="note">{viewSchemeData.noNote}</div>
            </>
          ) : !isComplete ? (
            <>
              <div className="big">
                {answeredCount} de {totalQuestions} respondidas
              </div>
              <div className="note">
                Completar todas las preguntas para ver el resultado.
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={26} className="shrink-0 text-white" />
                <div className="big">{viewSchemeData.ok}</div>
              </div>
              <div className="note">{viewSchemeData.okNote}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
