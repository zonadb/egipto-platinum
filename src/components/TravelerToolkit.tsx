import React, { useState, useEffect, useMemo } from 'react';
import { CHECKLIST_ITEMS, WEATHER_FORECAST_DATA } from '../data/travelData';
import { ChecklistItem, WeatherCity } from '../types';
import {
  CheckSquare,
  Square,
  Calculator,
  ArrowRightLeft,
  Sun,
  CloudSun,
  Wind,
  Thermometer,
  ShieldAlert,
  Plus,
  Trash2,
  RotateCcw,
  Search,
  Filter,
  Sparkles,
  CreditCard,
  Luggage,
  Droplets,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

type ChecklistCategory = 'todos' | 'documentos' | 'electronica' | 'aseo' | 'salud' | 'ropa' | 'dinero';

export const TravelerToolkit: React.FC = () => {
  // ----------------------------------------------------
  // 1. CONVERSOR DE MONEDA (EUR <-> EGP)
  // ----------------------------------------------------
  const [conversionDirection, setConversionDirection] = useState<'EUR_TO_EGP' | 'EGP_TO_EUR'>('EUR_TO_EGP');
  const [inputValue, setInputValue] = useState<string>('50');
  const [exchangeRate, setExchangeRate] = useState<number>(53.2); // 1 EUR ≈ 53.2 EGP
  const [isCustomRate, setIsCustomRate] = useState<boolean>(false);

  const swapConversion = () => {
    setConversionDirection((prev) => (prev === 'EUR_TO_EGP' ? 'EGP_TO_EUR' : 'EUR_TO_EGP'));
    // Convert current value sensibly
    const num = parseFloat(inputValue) || 0;
    if (conversionDirection === 'EUR_TO_EGP') {
      // Was EUR, now EGP
      setInputValue((num * exchangeRate).toFixed(0));
    } else {
      // Was EGP, now EUR
      setInputValue((num / exchangeRate).toFixed(1));
    }
  };

  const calculatedResult = useMemo(() => {
    const val = parseFloat(inputValue) || 0;
    if (conversionDirection === 'EUR_TO_EGP') {
      return (val * exchangeRate).toFixed(1);
    } else {
      return (val / exchangeRate).toFixed(2);
    }
  }, [inputValue, exchangeRate, conversionDirection]);

  // ----------------------------------------------------
  // 2. CHECKLIST INTERACTIVO (Local Storage & Personalización)
  // ----------------------------------------------------
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('zb_checklist_checked_2026');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customItems, setCustomItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('zb_checklist_custom_2026');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected Category and Search filter
  const [selectedCategory, setSelectedCategory] = useState<ChecklistCategory>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form for adding a new item
  const [newTitle, setNewTitle] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newCategory, setNewCategory] = useState<'documentos' | 'electronica' | 'aseo' | 'salud' | 'ropa' | 'dinero'>('aseo');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('zb_checklist_checked_2026', JSON.stringify(checkedIds));
    } catch (e) {
      console.warn('Error saving checklist checks', e);
    }
  }, [checkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('zb_checklist_custom_2026', JSON.stringify(customItems));
    } catch (e) {
      console.warn('Error saving custom items', e);
    }
  }, [customItems]);

  const allItems: ChecklistItem[] = useMemo(() => {
    return [...CHECKLIST_ITEMS, ...customItems];
  }, [customItems]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.detail.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allItems, selectedCategory, searchQuery]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const markAllFiltered = () => {
    const updated = { ...checkedIds };
    filteredItems.forEach((item) => {
      updated[item.id] = true;
    });
    setCheckedIds(updated);
  };

  const unmarkAllFiltered = () => {
    const updated = { ...checkedIds };
    filteredItems.forEach((item) => {
      delete updated[item.id];
    });
    setCheckedIds(updated);
  };

  const resetToDefault = () => {
    if (window.confirm('¿Deseas restablecer el checklist por defecto? Se mantendrán los artículos oficiales.')) {
      setCheckedIds({});
      setCustomItems([]);
    }
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: newCategory,
      title: newTitle.trim(),
      detail: newDetail.trim() || 'Artículo personal añadido para el viaje.',
      critical: false,
      isCustom: true,
    };

    setCustomItems((prev) => [newItem, ...prev]);
    setNewTitle('');
    setNewDetail('');
    setShowAddForm(false);
  };

  const handleDeleteCustomItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomItems((prev) => prev.filter((i) => i.id !== id));
    setCheckedIds((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const totalCount = allItems.length;
  const completedCount = allItems.filter((i) => checkedIds[i.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // ----------------------------------------------------
  // 3. PREVISIÓN DEL TIEMPO (DESTINOS EGIPTO OCT 2026)
  // ----------------------------------------------------
  const [selectedWeatherCity, setSelectedWeatherCity] = useState<string>('cairo');
  const activeCity = WEATHER_FORECAST_DATA.find((c) => c.id === selectedWeatherCity) || WEATHER_FORECAST_DATA[0];

  const getWeatherIcon = (type: WeatherCity['icon']) => {
    switch (type) {
      case 'sun':
        return <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" />;
      case 'sun-cloud':
        return <CloudSun className="w-6 h-6 text-amber-300" />;
      case 'wind':
        return <Wind className="w-6 h-6 text-cyan-300" />;
      default:
        return <Thermometer className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-cyan-950/70 border border-amber-900/40 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-2">
              <Luggage className="w-3.5 h-3.5 text-amber-400" />
              Kit del Viajero Oficial • Grupo Zona de Baño
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif-egypt tracking-tight">
              Checklist de Maleta, Conversor de Divisas & Previsión del Tiempo
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Herramientas esenciales para preparar tu equipaje sin descuidos (pasaporte, adaptadores, artículos de aseo), calcular gastos en tiempo real y conocer el clima en cada escala egipcia.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-right shrink-0">
            <span className="text-[11px] uppercase font-bold text-slate-400 block">
              Comprobación de Maleta
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold text-emerald-400 font-mono">
                {completedCount} / {totalCount}
              </span>
              <span className="text-xs text-slate-400">listos ({progressPercent}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* SECCIÓN 1: CHECKLIST INTERACTIVO DE VIAJE            */}
      {/* ==================================================== */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-serif-egypt">
                Checklist Interactivo: Artículos Esenciales y Maleta
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              No olvides pasaporte, adaptadores de corriente ni tu neceser de aseo homologado para el avión.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-700/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>Añadir Artículo</span>
            </button>
            <button
              onClick={resetToDefault}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors cursor-pointer"
              title="Restablecer checklist oficial"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">
              Progreso del equipaje: <strong className="text-emerald-400">{completedCount}</strong> de {totalCount} artículos marcados
            </span>
            <span className="font-mono font-bold text-amber-300">{progressPercent}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Add Custom Item Modal / Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddCustomItem}
            className="p-4 rounded-xl bg-slate-950 border border-cyan-800/60 space-y-3 animate-fadeIn"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Añadir Artículo Personal al Checklist
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Nombre del artículo (ej. Bañador para el crucero, Tarjetas de visita...)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="aseo">🧴 Artículos de Aseo</option>
                  <option value="electronica">🔌 Electrónica & Adaptadores</option>
                  <option value="documentos">🛂 Documentos</option>
                  <option value="salud">💊 Salud & Botiquín</option>
                  <option value="ropa">👕 Ropa & Calzado</option>
                  <option value="dinero">💳 Dinero & Tarjetas</option>
                </select>
              </div>
            </div>

            <input
              type="text"
              placeholder="Detalle o nota recordatoria (opcional)"
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400"
            />

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Guardar en mi lista
              </button>
            </div>
          </form>
        )}

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'documentos', label: '🛂 Pasaporte & Docs' },
              { id: 'electronica', label: '🔌 Adaptadores & Baterías' },
              { id: 'aseo', label: '🧴 Artículos de Aseo' },
              { id: 'salud', label: '💊 Botiquín & Salud' },
              { id: 'ropa', label: '👟 Ropa & Calzado' },
              { id: 'dinero', label: '💳 Dinero' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ChecklistCategory)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input & Bulk Actions */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Buscar artículo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
              />
            </div>
            <button
              onClick={markAllFiltered}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 text-slate-300 text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer"
              title="Marcar todos los visibles"
            >
              Marcar todos
            </button>
            <button
              onClick={unmarkAllFiltered}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer"
              title="Desmarcar visibles"
            >
              Desmarcar
            </button>
          </div>
        </div>

        {/* Highlighted Warning Strip for Essentials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-amber-200">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-400 font-bold">
              1
            </div>
            <div>
              <strong className="block text-white">Pasaporte Físico:</strong>
              Mínimo 6 meses de vigencia obligatoria.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2.5 text-cyan-200">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 font-bold">
              2
            </div>
            <div>
              <strong className="block text-white">Adaptadores de Enchufe:</strong>
              Clavija estándar tipo C/F (compatible).
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-200">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 font-bold">
              3
            </div>
            <div>
              <strong className="block text-white">Artículos de Aseo:</strong>
              Líquidos en cabina máx. 100 ml y agua embotellada.
            </div>
          </div>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {filteredItems.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-slate-500 text-xs">
              No se encontraron artículos con ese criterio de búsqueda.
            </div>
          ) : (
            filteredItems.map((item) => {
              const isChecked = !!checkedIds[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-slate-950/90 border-emerald-500/40 opacity-75'
                      : item.critical
                      ? 'bg-slate-900 border-amber-500/40 hover:border-amber-400 shadow-md'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-bold leading-tight ${
                            isChecked ? 'line-through text-slate-400' : 'text-white'
                          }`}
                        >
                          {item.title}
                        </span>
                        {item.critical && !isChecked && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-950 text-red-300 border border-red-800 font-semibold uppercase">
                            Crítico
                          </span>
                        )}
                        {item.isCustom && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium">
                            Personal
                          </span>
                        )}
                      </div>

                      {item.isCustom && (
                        <button
                          onClick={(e) => handleDeleteCustomItem(item.id, e)}
                          className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                          title="Eliminar artículo personal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p
                      className={`text-[11px] mt-1 leading-relaxed ${
                        isChecked ? 'line-through text-slate-500' : 'text-slate-300'
                      }`}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECCIÓN 2: CONVERSOR DE MONEDA BIDIRECCIONAL         */}
      {/* (EUR <-> EGP y viceversa)                           */}
      {/* ==================================================== */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-serif-egypt">
                Conversor Bidireccional de Divisas: Euros (€) ⇄ Libras Egipcias (EGP)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Calcula tanto de Euros a Libras Egipcias como a la inversa al hacer compras en bazares y hoteles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300">
              Tipo de cambio:{' '}
              <strong className="text-amber-300 font-mono">1 EUR = {exchangeRate} EGP</strong>
            </span>
          </div>
        </div>

        {/* Currency Calculator Interactive Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Input Box */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {conversionDirection === 'EUR_TO_EGP' ? 'Importe a Convertir (Euros €)' : 'Importe a Convertir (Libras EGP)'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-amber-300 border border-slate-800">
                {conversionDirection === 'EUR_TO_EGP' ? 'EUR' : 'EGP'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-amber-400">
                {conversionDirection === 'EUR_TO_EGP' ? '€' : 'EGP'}
              </span>
              <input
                type="number"
                min="0"
                step={conversionDirection === 'EUR_TO_EGP' ? '5' : '50'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent text-2xl sm:text-3xl font-mono font-bold text-white outline-none"
                placeholder="50"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-2 flex justify-center py-2">
            <button
              onClick={swapConversion}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-950 flex items-center justify-center gap-2 font-bold text-xs transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              title="Invertir dirección de conversión"
            >
              <ArrowRightLeft className="w-5 h-5" />
              <span className="lg:hidden">Invertir Dirección</span>
            </button>
          </div>

          {/* Output Box */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {conversionDirection === 'EUR_TO_EGP' ? 'Resultado en Libras Egipcias (EGP)' : 'Resultado en Euros (€)'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-emerald-300 border border-slate-800">
                {conversionDirection === 'EUR_TO_EGP' ? 'EGP' : 'EUR'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-cyan-400">
                {conversionDirection === 'EUR_TO_EGP' ? 'EGP' : '€'}
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 truncate">
                {calculatedResult}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium">Accesos rápidos:</span>
          {conversionDirection === 'EUR_TO_EGP' ? (
            <>
              {['10', '20', '50', '100', '150', '200'].map((val) => (
                <button
                  key={val}
                  onClick={() => setInputValue(val)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
                >
                  {val} €
                </button>
              ))}
            </>
          ) : (
            <>
              {['100', '250', '500', '1000', '2500', '5000'].map((val) => (
                <button
                  key={val}
                  onClick={() => setInputValue(val)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
                >
                  {val} EGP
                </button>
              ))}
            </>
          )}
        </div>

        {/* Quick Reference Tables (Dual Direction Cheat Sheet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* EUR to EGP Reference */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Tabla Rápida: Euros ➔ Libras Egipcias
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900 flex justify-between">
                <span className="text-slate-300">5 €</span>
                <strong className="text-amber-300 font-mono">≈ 266 EGP</strong>
              </div>
              <div className="p-2 rounded bg-slate-900 flex justify-between">
                <span className="text-slate-300">10 €</span>
                <strong className="text-amber-300 font-mono">≈ 532 EGP</strong>
              </div>
              <div className="p-2 rounded bg-slate-900 flex justify-between">
                <span className="text-slate-300">20 €</span>
                <strong className="text-amber-300 font-mono">≈ 1.064 EGP</strong>
              </div>
              <div className="p-2 rounded bg-slate-900 flex justify-between">
                <span className="text-slate-300">50 €</span>
                <strong className="text-amber-300 font-mono">≈ 2.660 EGP</strong>
              </div>
            </div>
          </div>

          {/* EGP to EUR Reference */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
              Tabla Rápida: Libras Egipcias ➔ Euros
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900 flex justify-between">
                <span className="text-slate-300">50 EGP</span>
                <strong className="text-cyan-300 font-mono">≈ 0,94 €</strong>
              </div>
              <div className="p-2 rounded bg-slate-900 flex justify-between">
                <span className="text-slate-300">100 EGP</span>
                <strong className="text-cyan-300 font-mono">≈ 1,88 €</strong>
              </div>
              <div className="p-2 rounded bg-slate-900 flex justify-between">
                <span className="text-slate-300">250 EGP</span>
                <strong className="text-cyan-300 font-mono">≈ 4,70 €</strong>
              </div>
              <div className="p-2 rounded bg-slate-900 flex justify-between">
                <span className="text-slate-300">500 EGP</span>
                <strong className="text-cyan-300 font-mono">≈ 9,40 €</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Card Payment Advice Strip */}
        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white block font-bold mb-0.5">
              Consejo Clave para Pagos con Tarjeta (Revolut / N26):
            </strong>
            Al pagar en cualquier datáfono en Egipto, si la pantalla te ofrece cobrar en <strong>EUR</strong> o en <strong>EGP</strong>,{' '}
            <span className="text-amber-300 font-bold underline">marca siempre cobrar en EGP</span>. Así tu banco aplicará el tipo de cambio oficial interbancario sin las comisiones abusivas de los bancos locales.
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECCIÓN 3: PREVISIÓN DEL TIEMPO EN EGIPTO            */}
      {/* (09 al 16 de Octubre de 2026)                        */}
      {/* ==================================================== */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-serif-egypt">
                Previsión del Tiempo en las Escalas de Nuestro Viaje
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Temperaturas y condiciones previstas para las visitas del 09 al 16 de octubre de 2026.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            Clima otoñal cálido y seco
          </span>
        </div>

        {/* City Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {WEATHER_FORECAST_DATA.map((city) => {
            const isSelected = selectedWeatherCity === city.id;
            return (
              <button
                key={city.id}
                onClick={() => setSelectedWeatherCity(city.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500/20 to-slate-900 border-amber-500/60 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{city.name}</span>
                  {getWeatherIcon(city.icon)}
                </div>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-xl font-bold text-amber-300 font-mono">
                    {city.tempDay}°C
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ {city.tempNight}°C</span>
                </div>
                <span className="text-[10px] text-slate-400 block truncate">
                  {city.dates}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active City Weather Highlight Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-serif-egypt">
                  {activeCity.name}
                </h3>
                <span className="text-xs text-slate-400">({activeCity.region})</span>
              </div>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                {activeCity.dates} • {activeCity.condition}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Máxima Diurna
                </span>
                <span className="text-lg font-bold text-amber-400 font-mono">
                  {activeCity.tempDay}°C
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Mínima Noche
                </span>
                <span className="text-lg font-bold text-cyan-300 font-mono">
                  {activeCity.tempNight}°C
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Índice Ultravioleta (UV)</span>
                <span className="font-bold text-amber-400">{activeCity.uvIndex} / 10</span>
              </div>
              <span className="text-[11px] text-amber-200/90 block">
                Muy alto. Crema solar SPF 50+, gafas de sol y gorra imprescindibles.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Humedad Relativa</span>
                <span className="font-bold text-cyan-300">{activeCity.humidity}%</span>
              </div>
              <span className="text-[11px] text-slate-300 block">
                {activeCity.humidity < 35 ? 'Ambiente desértico seco. Bebe mucha agua embotellada.' : 'Brisa costera húmeda y agradable.'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-semibold">Excursiones en esta zona</span>
              <span className="text-[11px] text-slate-200 block leading-tight">
                {activeCity.highlights}
              </span>
            </div>
          </div>

          {/* Clothing & Packing recommendation */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold mb-0.5">
                Recomendación de Ropa para {activeCity.name}:
              </strong>
              {activeCity.clothingTip}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
