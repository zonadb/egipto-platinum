import React from 'react';
import { RULES_AND_SAFETY, INSURANCE_DATA } from '../data/travelData';
import { Shield, ShieldAlert, PhoneCall, AlertOctagon, Droplets, CheckCircle, Smartphone, CreditCard, Ban, FileText, Sparkles } from 'lucide-react';

export const RulesAndSafety: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Emergency ARAG Medical Call Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold border border-red-500/30">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              PÓLIZA DE SEGURO MÉDICO OFICIAL INCLUIDA
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-egypt">
              Asistencia Médica y Emergencias 24 Horas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Todos los participantes del Grupo Zona de Baño viajan con cobertura integral médica de hasta{' '}
              <strong className="text-emerald-300 font-bold">{INSURANCE_DATA.medicalCoverage}</strong>,
              repatriación y telemedicina inmediata en español con <em>Doctor for Travel</em>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700">
                Compañía: <strong className="text-white">{INSURANCE_DATA.company}</strong>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700">
                Póliza: <strong className="text-amber-300 font-mono">{INSURANCE_DATA.policyNumber}</strong>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700">
                Certificado: <strong className="text-amber-300 font-mono">{INSURANCE_DATA.certificateNumber}</strong>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end w-full md:w-auto shrink-0">
            <a
              href={`tel:${INSURANCE_DATA.phone24h.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-red-950/60 ring-2 ring-red-400/30 transition-all cursor-pointer"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span>Llamar a Asistencia ARAG: {INSURANCE_DATA.phone24h}</span>
            </a>
            <span className="text-[11px] text-slate-400 mt-2 text-center sm:text-right">
              Atención ininterrumpida 24/7 en español
            </span>
          </div>
        </div>
      </div>

      {/* Critical Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Passport Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                REQUISITO IMPRESCINDIBLE
              </span>
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif-egypt">
              Pasaporte Físico Original (Validez mín. 6 meses)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Es <strong>obligatorio</strong> llevar el documento físico original en perfecto estado. Debe tener una <strong>validez mínima de 6 meses</strong> desde la fecha de salida (octubre 2026).
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-red-300 flex items-start gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>
              <strong>¡Atención!</strong> No se permite viajar a Egipto únicamente con el DNI español. Si tu pasaporte caduca antes de abril 2027, renuévalo de inmediato.
            </span>
          </div>
        </div>

        {/* Drones Absolute Prohibition Card */}
        <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/50 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-950 text-red-300 border border-red-800 uppercase flex items-center gap-1">
                <Ban className="w-3.5 h-3.5 text-red-400" />
                PROHIBICIÓN MILITAR ABSOLUTA
              </span>
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif-egypt">
              Terminantemente Prohibido Llevar Drones
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Por <strong>ley de seguridad nacional militar en Egipto</strong>, está estrictamente prohibida la entrada, tenencia y sobrevuelo de drones, por pequeños o recreativos que sean.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-start gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>
              La aduana los requisa automáticamente mediante escáner y puede acarrear multas graves e interrogatorios judiciales. <strong>NO lleves ningún dron</strong>.
            </span>
          </div>
        </div>

        {/* Powerbanks Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-800 uppercase">
                EQUIPAJE DE VUELO
              </span>
              <Smartphone className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif-egypt">
              Powerbanks OBLIGATORIAMENTE en Mano
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Las baterías portátiles de litio deben transportarse <strong>exclusivamente en tu equipaje de mano de cabina</strong>. Está prohibido introducirlas en la maleta facturada de bodega.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              En el control de seguridad de la T1 o T2B, mantén la batería en tu mochila o bolso para sacarla a la bandeja si se requiere.
            </span>
          </div>
        </div>

        {/* Safe Water & Health Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                PREVENCIÓN SANITARIA
              </span>
              <Droplets className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif-egypt">
              Agua EXCLUSIVAMENTE Embotellada y Precintada
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Para evitar cualquier malestar digestivo durante las excursiones, bebe únicamente agua en botella precintada de origen. Úsala también para el cepillado de dientes en el barco y hotel.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              Evita cubitos de hielo en bebidas de puestos callejeros y opta por comida bien cocinada y servida caliente.
            </span>
          </div>
        </div>
      </div>

      {/* Currency and Payment Tips */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            Moneda, Tarjetas y Propinas en Egipto
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 block">Moneda Local (EGP)</span>
            <p className="text-slate-300 leading-relaxed">
              La moneda es la <strong>Libra Egipcia (EGP)</strong>. Aunque en tiendas de recuerdos turísticos aceptan a veces euros, el tipo de cambio que aplican suele ser desfavorable.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-300 block">Pago con Tarjeta (Revolut / N26)</span>
            <p className="text-slate-300 leading-relaxed">
              Al pagar con tarjeta en hoteles, restaurantes o tiendas, cuando el datáfono pregunte en qué divisa cobrarte, <strong>selecciona siempre pagar en EGP (Libras Egipcias)</strong> para evitar sobrecostes por conversión de divisa dinámica.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-300 block">Propinas del Viaje</span>
            <p className="text-slate-300 leading-relaxed">
              La <strong>cuota general de propinas del crucero y servicio (75 €)</strong> ya está totalmente incluida en el viaje de la cooperativa. Solo queda a discreción personal una propina directa al guía egiptólogo al final del circuito.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
