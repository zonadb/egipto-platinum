import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ChatAssistant } from './components/ChatAssistant';
import { ItineraryViewer } from './components/ItineraryViewer';
import { FlightsBoard } from './components/FlightsBoard';
import { RulesAndSafety } from './components/RulesAndSafety';
import { PlatinumCalculator } from './components/PlatinumCalculator';
import { TravelerToolkit } from './components/TravelerToolkit';
import { CORPORATE_INFO, INSURANCE_DATA } from './data/travelData';
import { Sparkles, PhoneCall, Plane, Calendar, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('chat');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Eve Alert (October 8/9, 2026) */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-cyan-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  ¡SALIDA MAÑANA! • 09 AL 16 DE OCTUBRE DE 2026
                </span>
                <span className="hidden sm:inline px-2 py-0.2 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Operativa Lista
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
                Vuelos chárter directos desde Madrid (Air Cairo T1) y Barcelona (Nile Air T2B). Recuerda presentarte <strong>3 horas antes</strong> con tu pasaporte original.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('flights')}
              className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plane className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Vuelos</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-950 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Reglas & ARAG</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'chat' && <ChatAssistant onNavigateTab={setActiveTab} />}
        {activeTab === 'itinerary' && <ItineraryViewer />}
        {activeTab === 'flights' && <FlightsBoard />}
        {activeTab === 'rules' && <RulesAndSafety />}
        {activeTab === 'calculator' && <PlatinumCalculator />}
        {activeTab === 'toolkit' && <TravelerToolkit />}
      </main>

      {/* Corporate Footer */}
      <footer className="mt-12 border-t border-slate-800 bg-slate-950/90 text-xs text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm font-serif-egypt">
                <span>{CORPORATE_INFO.name}</span>
                <span className="text-amber-400">•</span>
                <span className="font-sans text-xs text-amber-300 font-semibold">
                  Fundada en {CORPORATE_INFO.foundedYear}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1">
                {CORPORATE_INFO.mission}
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                Marca propia: <strong className="text-cyan-300">ZB Aquanatur</strong> • Feria Anual: <strong className="text-slate-300">{CORPORATE_INFO.annualFair}</strong>
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/20">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                <span>«{CORPORATE_INFO.motto}»</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1">
                Programa Platinum 2026 • Viaje Oficial de Convivencia a Egipto
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>
              Atención médica 24h Seguro ARAG:{' '}
              <a
                href={`tel:${INSURANCE_DATA.phone24h.replace(/\s+/g, '')}`}
                className="text-red-400 font-bold hover:underline"
              >
                {INSURANCE_DATA.phone24h}
              </a>{' '}
              (Póliza {INSURANCE_DATA.policyNumber})
            </div>
            <div>
              © 2026 Grupo Zona de Baño, Soc. COOP. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
