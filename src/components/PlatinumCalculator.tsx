import React, { useState } from 'react';
import { Trophy, CheckCircle, AlertCircle, ArrowUpRight, Sparkles, Building2, HelpCircle } from 'lucide-react';

export const PlatinumCalculator: React.FC = () => {
  const [purchases, setPurchases] = useState<number>(65000);
  const [points, setPoints] = useState<number>(260);

  // Requirements
  const REQ_1ST_PURCHASES = 60000;
  const REQ_1ST_POINTS = 240;
  const REQ_2ND_PURCHASES = 200000;

  const hasFirstPurchases = purchases >= REQ_1ST_PURCHASES;
  const hasFirstPoints = points >= REQ_1ST_POINTS;
  const hasFirstPass = hasFirstPurchases && hasFirstPoints;
  const hasSecondPass = purchases >= REQ_2ND_PURCHASES;

  const pct1stPurchases = Math.min(100, Math.round((purchases / REQ_1ST_PURCHASES) * 100));
  const pct1stPoints = Math.min(100, Math.round((points / REQ_1ST_POINTS) * 100));
  const pct2ndPurchases = Math.min(100, Math.round((purchases / REQ_2ND_PURCHASES) * 100));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-cyan-950/70 border border-amber-900/40 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Programa Platinum 2026 • Grupo Zona de Baño
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-egypt">
              Comprobador y Calculadora de Calificación Oficial
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Verifica el estado de tus plazas comerciales para el viaje oficial a Egipto según tus compras anuales y puntos de la marca propia <strong>ZB Aquanatur</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-center shrink-0 w-full sm:w-auto">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
              Estado de tu Empresa
            </span>
            <div className="mt-1">
              {hasSecondPass ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                  <CheckCircle className="w-3.5 h-3.5" /> 2 Plazas Conseguidas (Titular + Acompañante Gratis)
                </span>
              ) : hasFirstPass ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                  <CheckCircle className="w-3.5 h-3.5" /> 1ª Plaza Titular Conseguida
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> En proceso de calificación
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input Simulator */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" />
          Introduce los datos de tu empresa asociada
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Annual net purchases */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-200">
                Compras Netas Anuales en Proveedores del Grupo (€)
              </label>
              <span className="font-mono font-bold text-amber-300 text-sm">
                {purchases.toLocaleString('es-ES')} €
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={250000}
              step={1000}
              value={purchases}
              onChange={(e) => setPurchases(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>0 €</span>
              <span className="text-amber-400 font-semibold">60.000 € (1ª Plaza)</span>
              <span className="text-emerald-400 font-semibold">200.000 € (2ª Plaza)</span>
              <span>250.000 €</span>
            </div>
          </div>

          {/* ZB Aquanatur points */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-200">
                Puntos de la Marca Propia (ZB Aquanatur)
              </label>
              <span className="font-mono font-bold text-cyan-300 text-sm">
                {points} Pts
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={500}
              step={10}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>0 Pts</span>
              <span className="text-cyan-400 font-semibold">Mínimo 240 Pts</span>
              <span>500 Pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1st Ticket: Titular */}
        <div
          className={`p-6 rounded-2xl border shadow-xl flex flex-col justify-between transition-all ${
            hasFirstPass
              ? 'bg-gradient-to-b from-slate-900 to-amber-950/30 border-amber-500/50'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                1ª PLAZA (TITULAR)
              </span>
              {hasFirstPass ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> CALIFICADO
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-medium">Pendiente</span>
              )}
            </div>

            <h4 className="text-lg font-bold text-white mb-1 font-serif-egypt">
              Plaza Titular Representante
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Requisito: Alcanzar <strong>60.000 € netos</strong> en compras anuales + mínimo de <strong>240 Puntos ZB Aquanatur</strong>.
            </p>

            {/* Meters */}
            <div className="space-y-3 my-4">
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-300">
                  <span>Compras anuales: {purchases.toLocaleString('es-ES')} € / 60.000 €</span>
                  <span className="font-bold text-amber-300">{pct1stPurchases}%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-300 ${
                      hasFirstPurchases ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${pct1stPurchases}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-300">
                  <span>Puntos ZB Aquanatur: {points} / 240 Pts</span>
                  <span className="font-bold text-cyan-300">{pct1stPoints}%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-300 ${
                      hasFirstPoints ? 'bg-emerald-500' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${pct1stPoints}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs">
            {hasFirstPass ? (
              <p className="text-emerald-300 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                ¡Enhorabuena! Tu empresa cuenta con la 1ª plaza titular confirmada.
              </p>
            ) : (
              <p className="text-slate-400">
                Faltan:{' '}
                {!hasFirstPurchases && (
                  <strong className="text-amber-300">
                    {(REQ_1ST_PURCHASES - purchases).toLocaleString('es-ES')} € en compras{' '}
                  </strong>
                )}
                {!hasFirstPurchases && !hasFirstPoints && 'y '}
                {!hasFirstPoints && (
                  <strong className="text-cyan-300">
                    {REQ_1ST_POINTS - points} Puntos ZB Aquanatur
                  </strong>
                )}
              </p>
            )}
          </div>
        </div>

        {/* 2nd Ticket: Acompañante Gratis */}
        <div
          className={`p-6 rounded-2xl border shadow-xl flex flex-col justify-between transition-all ${
            hasSecondPass
              ? 'bg-gradient-to-b from-slate-900 to-emerald-950/30 border-emerald-500/50'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                2ª PLAZA (ACOMPAÑANTE GRATIS)
              </span>
              {hasSecondPass ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> CALIFICADO
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-medium">Pendiente</span>
              )}
            </div>

            <h4 className="text-lg font-bold text-white mb-1 font-serif-egypt">
              2ª Plaza Gratuita de Acompañante
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Requisito: Alcanzar o superar los <strong>200.000 € netos</strong> en compras anuales en proveedores de la cooperativa.
            </p>

            {/* Meter */}
            <div className="space-y-3 my-4">
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-300">
                  <span>Compras anuales: {purchases.toLocaleString('es-ES')} € / 200.000 €</span>
                  <span className="font-bold text-emerald-300">{pct2ndPurchases}%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-300 ${
                      hasSecondPass ? 'bg-emerald-500' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${pct2ndPurchases}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs">
            {hasSecondPass ? (
              <p className="text-emerald-300 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                ¡Excelente logro comercial! Dispones de la 2ª plaza de acompañante completamente gratuita.
              </p>
            ) : (
              <p className="text-slate-400">
                Faltan:{' '}
                <strong className="text-emerald-300">
                  {(REQ_2ND_PURCHASES - purchases).toLocaleString('es-ES')} € en compras
                </strong>{' '}
                para conseguir la 2ª plaza gratuita.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Official Plazas Rules */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          Normativa Oficial de Plazas del Grupo Zona de Baño:
        </div>
        <p className="leading-relaxed">
          • <strong>Representación Empresarial:</strong> Las plazas son personales para la representación directa de la empresa socia o asociada a la cooperativa.
        </p>
        <p className="leading-relaxed">
          • <strong>No Canjeables:</strong> Las plazas no son canjeables bajo ningún concepto por dinero en metálico ni por abonos o notas de crédito en cuenta.
        </p>
        <p className="leading-relaxed">
          • <strong>Intransferibles a Terceros:</strong> No se pueden transferir a terceros ni personas físicas o jurídicas ajenas a la cooperativa.
        </p>
      </div>
    </div>
  );
};
