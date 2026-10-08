import React from 'react';
import { ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { CORPORATE_INFO, INSURANCE_DATA } from '../data/travelData';
import { FlightCountdown } from './FlightCountdown';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'chat', label: 'Asistente IA', icon: '💬' },
    { id: 'itinerary', label: 'Itinerario', icon: '🗺️' },
    { id: 'flights', label: 'Vuelos & Logística', icon: '✈️' },
    { id: 'rules', label: 'Seguridad & ARAG', icon: '🛡️' },
    { id: 'calculator', label: 'Calificación Platinum', icon: '🏆' },
    { id: 'toolkit', label: 'Maleta, Clima & Divisas', icon: '🧳' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-amber-900/30">
      {/* Top Corporate Banner with Dynamic Countdown */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-amber-950 px-3 sm:px-4 py-1.5 text-xs border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left Brand Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-900/80 text-cyan-200 border border-cyan-500/30">
              GRUPO ZONA DE BAÑO • COOP.
            </span>
            <span className="text-slate-300 hidden md:inline">
              Viaje de Convivencia a Egipto (09 - 16 Octubre 2026)
            </span>
          </div>

          {/* Center Dynamic Countdown to Flight */}
          <div className="flex items-center">
            <FlightCountdown />
          </div>

          {/* Right Slogan & Emergency ARAG Call */}
          <div className="flex items-center gap-3">
            <span className="italic text-amber-300/90 font-medium hidden lg:inline text-[11px]">
              «{CORPORATE_INFO.motto}»
            </span>
            <a
              href={`tel:${INSURANCE_DATA.phone24h.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/80 hover:bg-red-900 text-red-200 text-[11px] font-medium border border-red-500/40 transition-colors"
              title="Llamada de Asistencia 24h Seguro ARAG"
            >
              <PhoneCall className="w-3 h-3 text-red-400 animate-pulse" />
              <span>ARAG 24h: {INSURANCE_DATA.phone24h}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-cyan-700 flex items-center justify-center shadow-lg shadow-amber-950/40 ring-1 ring-amber-300/30">
              <span className="text-xl">🏺</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white font-serif-egypt">
                  ZONA DE BAÑO
                </span>
                <span className="px-1.5 py-0.5 text-[10px] tracking-wider uppercase font-black bg-gradient-to-r from-amber-500 to-amber-300 text-slate-950 rounded font-sans">
                  PLATINUM 2026
                </span>
              </div>
              <p className="text-xs text-amber-200/70 font-sans hidden sm:block">
                Asistente Virtual Oficial • Egipto 09 al 16 Octubre
              </p>
            </div>
          </div>

          {/* Right quick stats */}
          <div className="hidden lg:flex items-center gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">Marca Oficial:</span>
              <span className="font-semibold text-cyan-300">ZB Aquanatur</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Seguro ARAG:</span>
              <span className="font-semibold text-emerald-300">2.000.000 €</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 mt-3 pt-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm shadow-amber-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
