import React, { useState } from 'react';
import { RouteType, SchemeKey, ViewMode } from '../types';
import { SCHEMES } from '../data/sustainabilityData';
import { X, Copy, Check, FileText } from 'lucide-react';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  view: ViewMode;
  currentScheme: SchemeKey;
  route: RouteType;
  answers: Record<number, number>;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  isOpen,
  onClose,
  view,
  currentScheme,
  route,
  answers,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const scheme = SCHEMES[currentScheme];
  const viewScheme = scheme[view];
  const questions = viewScheme.qs.map((q) =>
    typeof q === 'string' ? { q, ok: 1 } : q
  );

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === questions.length;
  const failed = questions
    .map((q, idx) => ({ ...q, val: answers[idx] }))
    .filter((q) => q.val !== undefined && q.val !== q.ok);

  let statusText = 'PENDIENTE DE EVALUACIÓN';
  if (failed.length > 0) {
    statusText = `NO CALIFICA (${failed.length} requisito/s no cumplidos)`;
  } else if (isComplete) {
    statusText = 'CALIFICA / APROBADO';
  }

  const generateReportText = () => {
    return [
      `PROGRAMA DE SOJA SUSTENTABLE - LA BRAGADENSE`,
      `=============================================`,
      `Fecha: ${new Date().toLocaleDateString('es-AR')}`,
      `Perfil: ${view === 'com' ? 'Comercial' : 'Logística y Plantas'}`,
      `Esquema: ${scheme.code} (${scheme.dest})`,
      `Fecha de corte: ${scheme.cut}`,
      `Recorrido: ${route === 'plant' ? 'Pasa por planta LB' : 'Directo a puerto'}`,
      `Estado: ${statusText}`,
      ``,
      `DETALLE DE REQUISITOS:`,
      ...questions.map((q, i) => {
        const val = answers[i];
        const res = val === undefined ? 'Sin responder' : val === 1 ? 'Sí' : 'No';
        return `- ${q.q}: ${res}`;
      }),
      ``,
      `CONCLUSIÓN / PRÓXIMO PASO:`,
      failed.length > 0 ? viewScheme.noNote : isComplete ? viewScheme.okNote : 'Completar el cuestionario.',
      `=============================================`,
      `Guía interna Mesa de Originación La Bragadense`,
    ].join('\n');
  };

  const handleCopy = async () => {
    const text = generateReportText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[var(--bg)] text-[var(--ink)] border border-[var(--line)] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--muted)] hover:text-[var(--ink)] rounded-full hover:bg-[var(--surface)] transition-colors"
          title="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--teal)]">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Resumen de la Consulta</h3>
            <p className="text-xs text-[var(--muted)]">
              Ficha para el cliente o registro interno
            </p>
          </div>
        </div>

        <div className="space-y-3 bg-[var(--surface)] p-4 rounded-xl text-sm border border-[var(--line)]">
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Perfil:</span>
            <span className="font-semibold">
              {view === 'com' ? 'Comerciales' : 'Logística y Plantas'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Esquema:</span>
            <span className="font-bold text-[var(--teal)]">{scheme.code}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Destino:</span>
            <span className="text-right">{scheme.dest}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Fecha de corte:</span>
            <span className="font-semibold">{scheme.cut}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Logística:</span>
            <span className="font-semibold">
              {route === 'plant' ? 'Pasa por planta LB' : 'Directo a puerto'}
            </span>
          </div>
          <div className="pt-2 border-t border-[var(--line)] flex justify-between items-center">
            <span className="text-[var(--muted)]">Resultado:</span>
            <span
              className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                failed.length > 0
                  ? 'bg-[var(--bad)] text-white'
                  : isComplete
                  ? 'bg-[var(--ok)] text-white'
                  : 'bg-[var(--surface-2)] text-[var(--ink)]'
              }`}
            >
              {statusText}
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 bg-[var(--teal)] hover:bg-[var(--accent)] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={18} />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Copiar texto de resumen</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--ink)] font-semibold rounded-xl border border-[var(--line)] transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
