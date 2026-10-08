import React, { useState } from 'react';
import { ITINERARY_DAYS, HOTELS_DATA } from '../data/travelData';
import { Calendar, MapPin, Compass, ShieldCheck, CheckCircle2, Info, Star, ChevronRight, Sparkles } from 'lucide-react';

export const ItineraryViewer: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const selectedDay = ITINERARY_DAYS[selectedDayIndex];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-cyan-950/60 border border-amber-900/40 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Itinerario Oficial Platinum 2026 • 8 Días / 7 Noches
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-egypt tracking-tight mb-2">
            Viaje de Convivencia a Egipto: Del Nilo a las Pirámides
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Un recorrido privado y exclusivo para los socios y representantes del Grupo Zona de Baño. Autobús exclusivo, guía de habla hispana, crucero 5★ B Plus y los mejores hitos de la civilización faraónica.
          </p>
        </div>
      </div>

      {/* Accommodations Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HOTELS_DATA.map((hotel, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  {hotel.type}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{hotel.category}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 font-serif-egypt">
                {hotel.name}
              </h3>
              <p className="text-xs text-amber-300/90 font-medium mb-3">
                {hotel.dates} ({hotel.nights} noches) • {hotel.regime}
              </p>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {hotel.description}
              </p>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-slate-800 text-xs">
              {hotel.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Day by Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {ITINERARY_DAYS.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={day.day}
              onClick={() => setSelectedDayIndex(idx)}
              className={`flex flex-col items-center p-3 rounded-xl min-w-[105px] border transition-all text-center shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-500/25 to-slate-900 border-amber-500/60 shadow-lg text-white'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Día {day.day}
              </span>
              <span className="text-sm font-semibold mt-0.5 whitespace-nowrap">
                {day.date.split(',')[1]?.trim() || `Día ${day.day}`}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 truncate max-w-[90px]">
                {day.location}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                DÍA {selectedDay.day} DE 8
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {selectedDay.date}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-egypt">
              {selectedDay.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-cyan-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {selectedDay.location}
            </span>
          </div>
        </div>

        {/* Accommodation and Regime */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Alojamiento Confirmado
            </span>
            <p className="text-sm font-bold text-white mt-0.5">
              {selectedDay.accommodation}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Régimen Alimenticio
            </span>
            <p className="text-sm font-bold text-amber-300 mt-0.5">
              {selectedDay.regime}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="my-5">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Programa del Día
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
            {selectedDay.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="my-5">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            Momentos Clave & Monumentos
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedDay.highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-200"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Day Tip */}
        {selectedDay.tips && (
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-cyan-200 block mb-0.5">
                Consejo Especial para este Día:
              </span>
              <p className="text-xs text-cyan-100/90 leading-relaxed">
                {selectedDay.tips}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Inclusions Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Servicios Incluidos en el Viaje de Convivencia ZB
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Visado de Entrada:</strong>
              Valorado en 30 € por persona, gestionado e incluido.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Propinas del Crucero:</strong>
              Cuota de servicio general de 75 € incluida.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Autobuses Exclusivos:</strong>
              Vehículos privados con aire acondicionado para el grupo ZB.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Entrada Interior Pirámide:</strong>
              Acceso especial al interior de la 2ª o 3ª Pirámide y GEM.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Guía Oficial de Habla Hispana:</strong>
              Egiptólogo titulado acompañando las visitas.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Seguro Médico ARAG:</strong>
              Cobertura médica hasta 2.000.000 € y Doctor for Travel.
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-[11px] text-amber-200/80 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>No incluido:</strong> Bebidas durante las comidas/crucero y propina personal directa al guía local.
          </span>
        </div>
      </div>
    </div>
  );
};
