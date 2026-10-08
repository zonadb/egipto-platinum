import React, { useState } from 'react';
import { FLIGHTS_DATA } from '../data/travelData';
import { Plane, Clock, AlertTriangle, ShieldAlert, Luggage, BatteryCharging, CheckCircle2, MapPin } from 'lucide-react';

export const FlightsBoard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<'Madrid' | 'Barcelona'>('Madrid');
  const flightData = FLIGHTS_DATA[selectedCity];

  return (
    <div className="space-y-6">
      {/* City Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
            Operativa de Vuelos Chárter Oficial
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-egypt mt-0.5">
            Tarjetas de Vuelo y Presentación en Aeropuerto
          </h2>
        </div>

        {/* Toggle buttons */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedCity('Madrid')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCity === 'Madrid'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇪🇸 Salida Madrid (MAD - T1)
          </button>
          <button
            onClick={() => setSelectedCity('Barcelona')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCity === 'Barcelona'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇪🇸 Salida Barcelona (BCN - T2B)
          </button>
        </div>
      </div>

      {/* Critical Presentation Warning */}
      <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 flex items-start gap-3.5 shadow-md">
        <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
        <div className="text-xs sm:text-sm leading-relaxed">
          <strong className="text-white block font-bold">
            PRESENTACIÓN OBLIGATORIA: 3 HORAS ANTES EN MOSTRADORES DE FACTURACIÓN
          </strong>
          Para el vuelo de ida (09/10), debes presentarte en los mostradores a las{' '}
          <span className="font-bold underline text-amber-300">
            {flightData.presentationTimeIda}
          </span>
          . El control de pasaportes y visado para vuelos chárter a Egipto requiere tiempo de tramitación previo al embarque.
        </div>
      </div>

      {/* Outbound & Inbound Flight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outbound */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase">
                VUELO DE IDA
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {flightData.outbound.date}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">
              {flightData.outbound.flightNumber}
            </span>
          </div>

          <div className="my-6">
            <div className="text-xs text-slate-400 font-medium mb-1">
              Compañía: <strong className="text-white">{flightData.outbound.airline}</strong>
            </div>

            <div className="flex items-center justify-between my-4">
              <div className="text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {flightData.outbound.fromCode}
                </span>
                <p className="text-xs text-slate-400">{flightData.city}</p>
                <p className="text-lg font-bold text-amber-300 mt-1">
                  {flightData.outbound.departureTime}
                </p>
                <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {flightData.outbound.terminal}
                </span>
              </div>

              <div className="flex-1 px-4 flex flex-col items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">
                  Chárter Directo
                </span>
                <div className="w-full flex items-center">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20" />
                  <Plane className="w-4 h-4 text-amber-400 mx-1 rotate-90" />
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20" />
                </div>
                <span className="text-[10px] text-cyan-400 mt-1 font-mono">
                  ~ 5h de vuelo
                </span>
              </div>

              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {flightData.outbound.toCode}
                </span>
                <p className="text-xs text-slate-400">Aswan (Egipto)</p>
                <p className="text-lg font-bold text-amber-300 mt-1">
                  {flightData.outbound.arrivalTime}
                </p>
                <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  Aeropuerto ASW
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Llegada a Aswan:</strong> Asistencia de bienvenida en el aeropuerto por el personal local, tramitación del visado de entrada y traslado en autocar privado exclusivo hasta la <strong>Motonave M/S El Jamila</strong>.
            </span>
          </div>
        </div>

        {/* Inbound */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-800/60 uppercase">
                VUELO DE REGRESO
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {flightData.inbound.date}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">
              {flightData.inbound.flightNumber}
            </span>
          </div>

          <div className="my-6">
            <div className="text-xs text-slate-400 font-medium mb-1">
              Compañía: <strong className="text-white">{flightData.inbound.airline}</strong>
            </div>

            <div className="flex items-center justify-between my-4">
              <div className="text-left">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {flightData.inbound.fromCode}
                </span>
                <p className="text-xs text-slate-400">El Cairo (Egipto)</p>
                <p className="text-lg font-bold text-amber-300 mt-1">
                  {flightData.inbound.departureTime}
                </p>
                <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  Aeropuerto CAI
                </span>
              </div>

              <div className="flex-1 px-4 flex flex-col items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">
                  Chárter Directo
                </span>
                <div className="w-full flex items-center">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20" />
                  <Plane className="w-4 h-4 text-amber-400 mx-1 rotate-90" />
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20" />
                </div>
                <span className="text-[10px] text-cyan-400 mt-1 font-mono">
                  ~ 4h 50m de vuelo
                </span>
              </div>

              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {flightData.inbound.toCode}
                </span>
                <p className="text-xs text-slate-400">{flightData.city}</p>
                <p className="text-lg font-bold text-amber-300 mt-1">
                  {flightData.inbound.arrivalTime}
                </p>
                <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {selectedCity === 'Madrid' ? 'Terminal T1' : 'Terminal T2B'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Traslado de regreso:</strong> El autocar del receptivo recogerá al grupo en el <strong>Hotel Gewan</strong> de El Cairo con la antelación necesaria para realizar la facturación y control de seguridad sin prisas.
            </span>
          </div>
        </div>
      </div>

      {/* Luggage and Baggage Specs */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Luggage className="w-5 h-5 text-amber-400" />
          Normativa de Equipaje de los Vuelos Chárter
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Checked luggage */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>MALETA EN BODEGA</span>
                <span className="text-cyan-300">Facturada</span>
              </div>
              <div className="text-3xl font-extrabold text-white font-mono mb-1">
                20 <span className="text-sm font-sans text-slate-400">kg máx.</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                1 sola maleta facturada por persona. Cualquier exceso de peso puede suponer recargo de la aerolínea.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Incluido en la franquicia ZB</span>
            </div>
          </div>

          {/* Cabin baggage */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>EQUIPAJE DE MANO</span>
                <span className="text-amber-300">En Cabina</span>
              </div>
              <div className="text-3xl font-extrabold text-white font-mono mb-1">
                8 <span className="text-sm font-sans text-slate-400">kg máx.</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                1 bulto por persona. Dimensiones máximas: <strong>55 x 40 x 20 cm</strong>. Líquidos en envases de máx. 100 ml en bolsa transparente.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Sube contigo al avión</span>
            </div>
          </div>

          {/* Lithium & Powerbanks Critical rule */}
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-red-300 mb-2">
                <span className="flex items-center gap-1 font-bold">
                  <BatteryCharging className="w-4 h-4 text-red-400" />
                  POWERBANKS (BATERÍAS)
                </span>
                <span className="text-[10px] uppercase font-bold text-red-400 bg-red-950 px-1.5 py-0.5 rounded border border-red-800">
                  OBLIGATORIO
                </span>
              </div>
              <div className="text-sm font-bold text-white mb-1">
                Solo en Equipaje de Mano
              </div>
              <p className="text-xs text-red-200/90 leading-relaxed">
                Está <strong>terminantemente prohibido</strong> meter baterías externas en la maleta de bodega facturada. Deben viajar siempre en cabina contigo.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-red-900/50 text-[11px] text-red-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Retirada en escáner de bodega si se incumplen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
