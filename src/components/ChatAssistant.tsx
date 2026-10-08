import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Copy, Check, Volume2, VolumeX, Trash2, ShieldAlert, ArrowRight } from 'lucide-react';
import { ChatMessage } from '../types';
import { CORPORATE_INFO } from '../data/travelData';

interface ChatAssistantProps {
  onNavigateTab?: (tab: string) => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'model',
  text: `¡Bienvenido al **Asistente Virtual Oficial del Grupo Zona de Baño, Soc. COOP.** para el **Programa Platinum 2026**! 🇪🇬✨\n\n` +
    `Estoy aquí para atender a todos los socios, participantes y acompañantes de nuestro **Viaje Oficial de Convivencia a Egipto (del 9 al 16 de octubre de 2026)**.\n\n` +
    `Puedes consultarme sobre cualquier detalle de nuestra estancia:\n` +
    `• 🛂 **Documentación obligatoria** (pasaporte con validez mínima de 6 meses).\n` +
    `• ✈️ **Operativa de vuelos chárter** desde Madrid (T1) y Barcelona (T2B).\n` +
    `• 🧳 **Equipaje y normas de vuelo** (20 kg bodega, 8 kg mano, powerbanks en cabina).\n` +
    `• 🚫 **Prohibición absoluta de drones** por ley militar.\n` +
    `• 🏨 **Crucero M/S El Jamila** y **Hotel Gewan** en El Cairo.\n` +
    `• 🗺️ **Itinerario exclusivo y visitas** (Pirámides con acceso interior, GEM, Alejandría).\n` +
    `• 🛡️ **Póliza médica ARAG 24h** (+34 91 000 19 49) y salud con agua embotellada.\n` +
    `• 🏆 **Condiciones de calificación comercial** del Programa Platinum.\n\n` +
    `*«${CORPORATE_INFO.motto}»*. ¿En qué puedo ayudarte hoy?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  source: 'gemini',
};

const SUGGESTED_QUERIES = [
  '¿Qué documentación necesito para entrar a Egipto?',
  '¿Cuáles son los horarios de los vuelos desde Madrid y Barcelona?',
  '¿Puedo llevar mi dron para hacer fotos aéreas?',
  '¿Dónde debo llevar la batería externa (powerbank)?',
  '¿Cuáles son los requisitos de calificación Platinum 2026?',
  '¿Cómo contactar con el seguro médico ARAG?',
  '¿Qué hoteles y régimen de comidas tenemos incluidos?',
  '¿Cuáles son las recomendaciones sobre el agua y la comida?',
];

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ onNavigateTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      // Build conversation history excluding initial welcome
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al conectar con el servidor');
      }

      const data = await res.json();
      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || 'No he podido procesar tu respuesta en este instante. Por favor, consulta con la organización del Grupo Zona de Baño. ¡Juntos somos más fuertes!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini',
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        text: `Lo siento, ha ocurrido una incidencia momentánea de red. Recuerda que para cualquier gestión urgente puedes consultar directamente con la organización del Grupo Zona de Baño o llamar al seguro ARAG (+34 91 000 19 49).\n\n¡*Juntos somos más fuertes*!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'fallback',
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown stars for clearer speech
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleClear = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([INITIAL_MESSAGE]);
  };

  // Helper to render simple structured markdown (bold, lists, headers)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Process bold parts within line
      const parts = line.split(/(\*\*.*?\*\*)/g);

      const formattedLine = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-semibold text-amber-200">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={partIdx} className="text-amber-300/90 italic">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });

      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-slate-200">
            <span className="text-amber-400 font-bold leading-relaxed">•</span>
            <div className="flex-1 leading-relaxed">{formattedLine}</div>
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 leading-relaxed text-slate-200">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[880px] bg-slate-900/50 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm">
      {/* Assistant Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-amber-900/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-950/60 ring-2 ring-amber-400/40">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-sm sm:text-base tracking-wide">
                Asistente Virtual Platinum 2026
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-semibold border border-amber-500/20">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                Oficial ZB
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Grupo Zona de Baño • Atención exclusiva para socios del viaje a Egipto
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 1 && (
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-300 hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
              title="Reiniciar conversación"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Alerts Strip */}
      <div className="bg-amber-950/30 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-200/90 overflow-x-auto gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-300">Avisos Críticos:</span>
          <span className="hidden sm:inline">Pasaporte físic. con 6 meses de validez</span>
          <span className="text-amber-500">•</span>
          <span className="text-red-300 font-medium">NO llevar Drones (Prohibición Militar)</span>
          <span className="text-amber-500">•</span>
          <span>Powerbanks solo en mano</span>
        </div>
        {onNavigateTab && (
          <button
            onClick={() => onNavigateTab('rules')}
            className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0 underline"
          >
            Ver normas completas <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 shadow-md ring-1 ring-amber-400/30'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-lg text-sm ${
                  isUser
                    ? 'bg-gradient-to-br from-cyan-900/90 to-blue-950/90 text-white border border-cyan-700/50 rounded-tr-none'
                    : 'bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-tl-none'
                }`}
              >
                {/* Message Content */}
                <div className="space-y-1">{renderFormattedText(message.text)}</div>

                {/* Footer of message */}
                <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400 gap-2">
                  <div className="flex items-center gap-2">
                    <span>{message.timestamp}</span>
                    {!isUser && message.source && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-900 text-amber-300/80 border border-slate-700">
                        {message.source === 'gemini' ? 'IA Gemini 3.8' : 'Base Oficial ZB'}
                      </span>
                    )}
                  </div>

                  {!isUser && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(message.text)}
                        className="p-1 hover:text-amber-300 rounded transition-colors"
                        title={isSpeaking ? 'Detener lectura' : 'Escuchar respuesta'}
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopy(message.id, message.text)}
                        className="p-1 hover:text-amber-300 rounded transition-colors"
                        title="Copiar respuesta"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-800/90 rounded-2xl rounded-tl-none p-4 border border-slate-700 shadow-md">
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Consultando datos oficiales de la cooperativa y del viaje...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Queries Pills */}
      <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800/80">
        <p className="text-[11px] text-slate-400 mb-1.5 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Preguntas frecuentes de socios y participantes:
        </p>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {SUGGESTED_QUERIES.map((query, index) => (
            <button
              key={index}
              onClick={() => handleSend(query)}
              disabled={isLoading}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-amber-950/60 hover:text-amber-200 text-slate-300 border border-slate-700/60 hover:border-amber-500/40 whitespace-nowrap transition-all duration-150 disabled:opacity-50"
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregunta sobre vuelos, equipaje, pasaporte, seguro, itinerario o calificación..."
            className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md shadow-amber-950 flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="hidden sm:inline">Preguntar</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
