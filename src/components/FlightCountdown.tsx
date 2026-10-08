import React, { useState, useEffect } from 'react';
import { Plane, Clock, Sparkles } from 'lucide-react';
import { FLIGHTS_DATA } from '../data/travelData';

interface FlightCountdownProps {
  compact?: boolean;
}

export const FlightCountdown: React.FC<FlightCountdownProps> = ({ compact = false }) => {
  const [selectedCity, setSelectedCity] = useState<'Madrid' | 'Barcelona'>('Madrid');

  // Flight departure ISO timestamp (Spain CEST UTC+2 on October 9, 2026)
  // Madrid: 13:30h local time | Barcelona: 13:35h local time
  const targetDate = new Date(
    selectedCity === 'Madrid'
      ? '2026-10-09T13:30:00+02:00'
      : '2026-10-09T13:35:00+02:00'
  ).getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
    isBoarding: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    isBoarding: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
          isBoarding: false,
        });
        return;
      }

      // Check if within 3 hours (boarding/airport presentation window)
      const isBoarding = diff <= 3 * 60 * 60 * 1000;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
        isBoarding,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const flightInfo = FLIGHTS_DATA[selectedCity].outbound;

  return (
    <div className="flex items-center gap-2">
      {/* City Toggle Selector (Pill) */}
      <div className="flex items-center rounded-lg bg-slate-900/90 border border-slate-700/80 p-0.5 text-[11px]">
        <button
          type="button"
          onClick={() => setSelectedCity('Madrid')}
          className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
            selectedCity === 'Madrid'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Vuelo Madrid T1 (13:30h)"
        >
          MAD
        </button>
        <button
          type="button"
          onClick={() => setSelectedCity('Barcelona')}
          className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
            selectedCity === 'Barcelona'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Vuelo Barcelona T2B (13:35h)"
        >
          BCN
        </button>
      </div>

      {/* Countdown Digits */}
      <div className="flex items-center gap-1 bg-slate-900/90 border border-amber-500/40 rounded-lg px-2.5 py-1 shadow-sm">
        <Plane className="w-3.5 h-3.5 text-amber-400 shrink-0 rotate-45 animate-pulse" />

        {timeLeft.isPast ? (
          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> ¡Vuelo despegado rumbo a Aswan!
          </span>
        ) : (
          <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-white tracking-tight">
            <span className="hidden sm:inline text-amber-300 font-sans text-[10px] uppercase font-semibold mr-0.5">
              Despegue {flightInfo.fromCode}:
            </span>
            <div className="flex items-center gap-0.5">
              <span className="px-1 py-0.2 rounded bg-slate-950 text-amber-300 border border-slate-800">
                {timeLeft.days}d
              </span>
              <span className="text-slate-500">:</span>
              <span className="px-1 py-0.2 rounded bg-slate-950 text-amber-300 border border-slate-800">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="text-slate-500">:</span>
              <span className="px-1 py-0.2 rounded bg-slate-950 text-amber-300 border border-slate-800">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="text-slate-500">:</span>
              <span className="px-1 py-0.2 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>

            {timeLeft.isBoarding && (
              <span className="ml-1 px-1.5 py-0.2 rounded text-[9px] bg-red-950 text-red-300 border border-red-700 font-bold uppercase animate-bounce">
                Facturación abierta
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
