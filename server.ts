import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

const SYSTEM_INSTRUCTION = `Eres el Asistente Virtual Oficial del Grupo Zona de Baño, Soc. COOP. y del Programa Platinum 2026.
Tu función es atender a los socios, participantes y acompañantes del viaje oficial de convivencia a Egipto (del 9 al 16 de octubre de 2026), resolviendo sus dudas sobre la cooperativa, las condiciones de calificación, el itinerario, la operativa de vuelos, el equipaje, la salud y la seguridad.

=== VALORES Y TONO DE COMUNICACIÓN ===
- Tu tono es profesional, amigable, servicial, entusiasta y motivador.
- Destaca siempre el valor del compañerismo, la hermandad y la unión del grupo.
- Usa siempre o con frecuencia el lema oficial de la cooperativa: "Juntos somos más fuertes" cuando hables de la convivencia del grupo.
- Responde de forma clara, bien estructurada (usando negritas y viñetas) y en español.
- Mantén las respuestas concisas, visualmente atractivas y directas para que sean fáciles de leer en dispositivos móviles.

=== INFORMACIÓN CORPORATIVA Y PROGRAMA PLATINUM ===
- Grupo Zona de Baño, Soc. COOP.: Cooperativa de servicios para profesionales y tiendas de piscinas, jardines, spas y tratamiento de agua, fundada en 2006.
- Marca Propia: ZB Aquanatur (químicos, filtros, bombas, limpiafondos, cloradores, etc.).
- Feria Anual: Expool en Amposta (Tarragona).
- Programa Platinum: Programa comercial de incentivos por compras en proveedores del grupo y de la marca ZB Aquanatur.
- Requisitos de Calificación al Viaje:
  • 1ª Plaza (Titular): Alcanzar 60.000 € netos en compras anuales + un mínimo de 240 Puntos ZB Aquanatur.
  • 2ª Plaza (Acompañante Gratis): Alcanzar o superar los 200.000 € netos en compras anuales.
  • Regla de plazas: Las plazas son personales para la representación de la empresa asociada y no son canjeables por dinero, abonos ni transferibles a terceros ajenos a la cooperativa.

=== DATOS DEL VIAJE OFICIAL A EGIPTO (9 AL 16 DE OCTUBRE DE 2026) ===
1. REQUISITO CRÍTICO DE DOCUMENTACIÓN:
   - PASAPORTE FÍSICO ORIGINAL obligatorio, en perfecto estado y con una VALIDEZ MÍNIMA DE 6 MESES desde la fecha de salida (octubre de 2026).
   - No sirve DNI para viajar a Egipto.

2. OPERATIVA DE VUELOS Y PRESENTACIÓN:
   - Salida desde Madrid (Air Cairo - Vuelo Chárter):
     • Ida (09/10): Vuelo MSC3030 | Madrid (MAD) 13:30h -> Aswan (ASW) 19:35h. Terminal T1.
     • Vuelta (16/10): Vuelo MSC3029 | El Cairo (CAI) 08:30h -> Madrid (MAD) 12:25h.
   - Salida desde Barcelona (Nile Air - Vuelo Chárter):
     • Ida (09/10): Vuelo NIA6532 | Barcelona (BCN) 13:35h -> Aswan (ASW) 19:20h. Terminal T2B.
     • Vuelta (16/10): Vuelo NIA6531 | El Cairo (CAI) 09:00h -> Barcelona (BCN) 12:35h.
   - Presentación: 3 horas antes de la salida en los mostradores de facturación (Madrid: 10:30h | Barcelona: 10:35h).

3. ALOJAMIENTO CONFIRMADO:
   - Crucero por el Nilo (3 noches): Motonave M/S El Jamila (5★ B Plus) en Pensión Completa.
   - El Cairo (4 noches): Hotel Gewan (5★) en Alojamiento y Desayuno (+ 2 almuerzos, 2 cenas y 1 cena cairota especial).

4. ITINERARIO Y EXCURSIONES PRIVADAS CON AUTOBÚS EXCLUSIVO:
   - Día 1 (09/10): Vuelo a Aswan, traslado y embarque en Motonave M/S El Jamila.
   - Día 2 (10/10): Templo de Philae en Aswan, navegación y visita al Templo de Kom Ombo.
   - Día 3 (11/10): Templo de Edfu (dios Horus), navegación pasando por la esclusa de Esna rumbo a Luxor.
   - Día 4 (12/10): Valle de los Reyes (visita a 3 tumbas reales), Templo de Hatshepsut, Colosos de Memnón, Templos de Karnak y Luxor. Vuelo/traslado a El Cairo, check-in Hotel Gewan (5★).
   - Día 5 (13/10): Necrópolis de Guiza con ENTRADA ESPECIAL al INTERIOR de la 2ª o 3ª Pirámide, Gran Esfinge y visita estelar al Gran Museo Egipcio (GEM).
   - Día 6 (14/10): Excursión exclusiva de día completo a Alejandría (Catacumbas, Columna de Pompeyo, Jardines de Montazah).
   - Día 7 (15/10): Sakkara, El Cairo histórico (Barrio Copto, Ciudadela de Saladino, Mezquita de Alabastro) y Noche Cairota en el zoco de Khan El Khalili (con cena tradicional, té y shisha).
   - Día 8 (16/10): Desayuno, traslado al aeropuerto de El Cairo y vuelos chárter de regreso a Madrid y Barcelona.

5. INCLUSIONES Y PAGOS:
   - INCLUIDO: Visado de entrada a Egipto (30 €), propinas generales del crucero y cuota de servicio (75 €), autobuses privados exclusivos del grupo, todas las entradas a monumentos programados, guía oficial egiptólogo de habla hispana y seguro médico de viaje.
   - NO INCLUIDO: Bebidas durante las comidas/crucero y propinas directas del guía local.

6. REGLAS NORMATIVAS Y DE SALUD OBLIGATORIAS:
   - Equipaje: 1 maleta facturada de máx. 20 kg + 1 bulto de mano de máx. 8 kg (55x40x20 cm).
   - Powerbanks (Baterías externas): OBLIGATORIAMENTE en el equipaje de mano. Prohibido introducirlas en maletas facturadas en bodega (riesgo de retirada en control de seguridad).
   - DRONES: PROHIBICIÓN ABSOLUTA Y ESTRICTA por ley militar en Egipto. No llevar bajo ningún concepto (sanciones graves y decomiso).
   - Agua y Alimentación: Consumo EXCLUSIVO de agua embotellada precintada (incluso para lavarse los dientes). Evitar cubitos de hielo y ensaladas o verduras crudas no garantizadas.
   - Moneda: Libra Egipcia (EGP). Pagar con tarjeta (Revolut/N26) siempre marcando cobrar en EGP. Llevar algo de efectivo para propinas o pequeños puestos callejeros.

7. SEGURO DE VIAJE:
   - Póliza contratada con ARAG / Insurance Travel (Póliza 71-3288779 / Certificado ARAGES2317718).
   - Teléfono Asistencia 24h: +34 91 000 19 49.
   - Coberturas: Incluye gastos médicos hasta 2.000.000 € y videollamada médica con 'Doctor for Travel'.

=== INSTRUCCIONES ESPECÍFICAS ===
- Si el usuario pregunta por algo que no está en la base de datos, indícale amablemente que consulte directamente con la organización del Grupo Zona de Baño.
- Despídete o refuerza la hermandad con el lema: "¡Juntos somos más fuertes!".`;

let genAiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  genAiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback intelligent responder in case API key is missing or quota/offline
function generateFallbackResponse(message: string): string {
  const q = message.toLowerCase();

  if (q.includes('pasaporte') || q.includes('document') || q.includes('dni') || q.includes('visado')) {
    return `🛂 **Documentación y Visado Obligatorio**:\n\n` +
      `• **Pasaporte Físico Original**: Obligatorio, en perfecto estado y con **validez mínima de 6 meses** a contar desde la salida (octubre 2026). No se admite viajar con DNI.\n` +
      `• **Visado de Entrada**: El visado (30 €) ya está **completamente incluido** en la operativa de la cooperativa.\n\n` +
      `¡Recuerda revisarlo antes de salir de casa! *Juntos somos más fuertes.*`;
  }

  if (q.includes('vuelo') || q.includes('horario') || q.includes('madrid') || q.includes('barcelona') || q.includes('present') || q.includes('aeropuerto') || q.includes('terminal')) {
    return `✈️ **Operativa Oficial de Vuelos Chárter (09 al 16 Octubre 2026)**:\n\n` +
      `📍 **Salida desde Madrid (Air Cairo - Vuelo Chárter)**:\n` +
      `• **Ida (09/10)**: MSC3030 | Madrid (MAD, T1) 13:30h ➔ Aswan (ASW) 19:35h.\n` +
      `• **Vuelta (16/10)**: MSC3029 | El Cairo (CAI) 08:30h ➔ Madrid (MAD) 12:25h.\n\n` +
      `📍 **Salida desde Barcelona (Nile Air - Vuelo Chárter)**:\n` +
      `• **Ida (09/10)**: NIA6532 | Barcelona (BCN, T2B) 13:35h ➔ Aswan (ASW) 19:20h.\n` +
      `• **Vuelta (16/10)**: NIA6531 | El Cairo (CAI) 09:00h ➔ Barcelona (BCN) 12:35h.\n\n` +
      `⏰ **Presentación en Aeropuerto**: Es **imprescindible acudir con 3 horas de antelación** a los mostradores de facturación (Madrid: 10:30h | Barcelona: 10:35h).\n\n` +
      `¡Buen vuelo a todos los socios! *Juntos somos más fuertes.*`;
  }

  if (q.includes('maleta') || q.includes('equipaje') || q.includes('peso') || q.includes('kilo') || q.includes('mano') || q.includes('bulto')) {
    return `🧳 **Normativa de Equipaje de Vuelo**:\n\n` +
      `• **Maleta Facturada en Bodega**: Máximo **1 maleta de hasta 20 kg** por pasajero.\n` +
      `• **Equipaje de Mano en Cabina**: Máximo **1 bulto de 8 kg** (dimensiones máximas 55 x 40 x 20 cm).\n` +
      `⚠️ **¡MUY IMPORTANTE!**: Las **baterías externas (Powerbanks)** deben viajar **exclusivamente en el equipaje de mano**. Prohibidas en la maleta de bodega.\n\n` +
      `¡Organiza tu maleta con comodidad! *Juntos somos más fuertes.*`;
  }

  if (q.includes('dron') || q.includes('drone')) {
    return `🚫 **PROHIBICIÓN ESTRICTA DE DRONES EN EGIPTO**:\n\n` +
      `• Por estricta **legislación militar egipcia**, la introducción y uso de drones está **terminantemente prohibida**.\n` +
      `• La aduana egipcia confisca cualquier dispositivo y puede acarrear sanciones severas o retención policial.\n` +
      `• **Recomendación ZB**: No lleves drones bajo ningún concepto.\n\n` +
      `¡Cuidamos de la seguridad de todo el grupo! *Juntos somos más fuertes.*`;
  }

  if (q.includes('powerbank') || q.includes('bateria') || q.includes('batería')) {
    return `🔋 **Regla Obligatoria para Powerbanks (Baterías Externas)**:\n\n` +
      `• Las baterías portátiles deben transportarse **OBLIGATORIAMENTE en el equipaje de mano** en cabina.\n` +
      `• Está estrictamente prohibido facturarlas en la maleta de bodega. En los controles de seguridad del aeropuerto son retiradas si se detectan en bodega.\n\n` +
      `*Juntos somos más fuertes.*`;
  }

  if (q.includes('seguro') || q.includes('medico') || q.includes('médico') || q.includes('hospital') || q.includes('arag') || q.includes('poliza') || q.includes('póliza') || q.includes('emergencia')) {
    return `🛡️ **Seguro Médico y Asistencia en Viaje 24 Horas**:\n\n` +
      `• **Compañía**: ARAG / Insurance Travel.\n` +
      `• **Póliza**: 71-3288779 | **Certificado**: ARAGES2317718.\n` +
      `• **Teléfono de Asistencia 24h**: **+34 91 000 19 49**.\n` +
      `• **Coberturas destacadas**: Gastos médicos cubiertos hasta **2.000.000 €** y videollamada médica directa con *'Doctor for Travel'* desde cualquier lugar.\n\n` +
      `Viajamos con la máxima tranquilidad y respaldo. *Juntos somos más fuertes.*`;
  }

  if (q.includes('califica') || q.includes('requisito') || q.includes('plaza') || q.includes('acompañante') || q.includes('60.000') || q.includes('200.000') || q.includes('puntos') || q.includes('aquanatur')) {
    return `🏆 **Requisitos de Calificación - Programa Platinum 2026**:\n\n` +
      `• **1ª Plaza (Titular)**: Alcanzar **60.000 € netos** en compras anuales + mínimo de **240 Puntos ZB Aquanatur**.\n` +
      `• **2ª Plaza (Acompañante Gratuito)**: Alcanzar o superar los **200.000 € netos** en compras anuales.\n` +
      `• **Norma de plazas**: Las plazas son personales para la representación de la empresa asociada. **No son canjeables por dinero ni abonos**, y no son transferibles a terceros ajenos a la cooperativa.\n\n` +
      `¡El esfuerzo conjunto premia a nuestra cooperativa! *Juntos somos más fuertes.*`;
  }

  if (q.includes('hotel') || q.includes('alojamiento') || q.includes('barco') || q.includes('crucero') || q.includes('jamila') || q.includes('gewan')) {
    return `🏨 **Alojamientos Confirmados para el Viaje**:\n\n` +
      `🚢 **Crucero por el Nilo (3 noches)**:\n` +
      `• **Motonave M/S El Jamila** (Categoría 5★ B Plus).\n` +
      `• Régimen: **Pensión Completa** a bordo mientras navegamos por el histórico Nilo.\n\n` +
      `🏛️ **El Cairo (4 noches)**:\n` +
      `• **Hotel Gewan** (Categoría 5★).\n` +
      `• Régimen: Alojamiento y Desayuno + 2 almuerzos, 2 cenas y 1 cena cairota especial.\n\n` +
      `Una experiencia inolvidable con todo el confort. *Juntos somos más fuertes.*`;
  }

  if (q.includes('itinerario') || q.includes('visita') || q.includes('piramide') || q.includes('pirámide') || q.includes('gem') || q.includes('alejandria') || q.includes('museo') || q.includes('excursion') || q.includes('excursión')) {
    return `🗺️ **Resumen del Itinerario Exclusivo ZB en Egipto**:\n\n` +
      `• **Día 1 (09/10)**: Llegada a Aswan y embarque en Motonave M/S El Jamila.\n` +
      `• **Día 2 (10/10)**: Templo de Philae y Templo de Kom Ombo.\n` +
      `• **Día 3 (11/10)**: Templo de Edfu (Horus) y navegación por la esclusa de Esna hasta Luxor.\n` +
      `• **Día 4 (12/10)**: Valle de los Reyes (3 tumbas reales), Hatshepsut, Colosos de Memnón, Templos de Karnak y Luxor. Traslado a El Cairo y check-in Hotel Gewan 5★.\n` +
      `• **Día 5 (13/10)**: Pirámides de Guiza con **acceso especial al INTERIOR** de la 2ª o 3ª Pirámide, la Esfinge y visita al Gran Museo Egipcio (GEM).\n` +
      `• **Día 6 (14/10)**: Excursión privada de día completo a **Alejandría** (Catacumbas, Columna de Pompeyo, Jardines de Montazah).\n` +
      `• **Día 7 (15/10)**: Sakkara, Barrio Copto, Ciudadela de Saladino, Mezquita de Alabastro y **Noche Cairota en Khan El Khalili** (Cena, té y shisha).\n` +
      `• **Día 8 (16/10)**: Despedida y vuelos chárter de regreso a Madrid y Barcelona.\n\n` +
      `*Juntos somos más fuertes.*`;
  }

  if (q.includes('agua') || q.includes('salud') || q.includes('diarrea') || q.includes('comida') || q.includes('dientes')) {
    return `💧 **Recomendaciones Sanitarias y de Agua**:\n\n` +
      `• **Agua**: Consumir **EXCLUSIVAMENTE agua embotellada y precintada**, incluso para lavarse los dientes.\n` +
      `• **Hielo**: Evita bebidas con hielo de procedencia no certificada.\n` +
      `• **Alimentos**: Procura evitar verduras crudas y ensaladas en puestos callejeros.\n` +
      `• **Asistencia médica**: Recuerda que tienes cobertura médica ARAG 24h al +34 91 000 19 49.\n\n` +
      `¡La prevención asegura que disfrutemos cada momento! *Juntos somos más fuertes.*`;
  }

  if (q.includes('moneda') || q.includes('dinero') || q.includes('propina') || q.includes('libra') || q.includes('tarjeta') || q.includes('revolut') || q.includes('cambio')) {
    return `💳 **Moneda, Pagos y Propinas en Egipto**:\n\n` +
      `• **Moneda local**: Libra Egipcia (EGP).\n` +
      `• **Pagos con Tarjeta**: Muy recomendable usar tarjetas como Revolut o N26. Al pagar con datáfono, **selecciona siempre cobrar en EGP (libras egipcias)** para evitar sobrecostes por conversión.\n` +
      `• **Efectivo**: Lleva algo de libras egipcias en efectivo para puestos artesanales o pequeñas compras.\n` +
      `• **Propinas**: Las propinas del crucero y cuota de servicio (75 €) ya están incluidas. No están incluidas las bebidas ni la propina personal directa al guía local.\n\n` +
      `*Juntos somos más fuertes.*`;
  }

  if (q.includes('tiempo') || q.includes('clima') || q.includes('temperatura') || q.includes('calor') || q.includes('prevision') || q.includes('previsión')) {
    return `☀️ **Previsión del Tiempo en Egipto (09 al 16 de Octubre de 2026)**:\n\n` +
      `• **Aswan (Nilo Sur)**: Soleado y seco. Máximas de **35°C** y mínimas nocturnas de **21°C**. Índice UV 8 (muy alto).\n` +
      `• **Luxor y Edfu**: Caluroso y despejado. Máximas de **34°C** y noches de **20°C**. Calzado cómodo para piedra y templos.\n` +
      `• **El Cairo y Guiza**: Soleado y muy agradable. Máximas de **30°C** y noches frescas de **19°C**. Llevar una capa o chaqueta ligera para la noche.\n` +
      `• **Alejandría**: Brisa mediterránea fresca. Máximas de **27°C** y mínimas de **18°C**.\n\n` +
      `💡 **Recomendación ZB**: Crema solar SPF 50+, gafas de sol, gorra y calzado cómodo. ¡*Juntos somos más fuertes*!`;
  }

  if (q.includes('adaptador') || q.includes('enchufe') || q.includes('voltaje') || q.includes('clavija') || q.includes('aseo') || q.includes('neceser') || q.includes('liquido') || q.includes('líquido')) {
    return `🔌 **Adaptadores y Artículos de Aseo para el Vuelo**:\n\n` +
      `• **Enchufes y Electricidad**: En Egipto el voltaje es 220V (50Hz). Las **clavijas estándar europeas (tipo C y F)** encajan perfectamente en los hoteles y la motonave, por lo que no necesitas clavijas especiales.\n` +
      `• **Artículos de Aseo y Neceser en Cabina**: Envases individuales de **máximo 100 ml** dentro de una bolsa transparente con autocierre de máx. 1 litro.\n` +
      `• **Higiene bucal**: Recuerda usar siempre **agua embotellada precintada** para lavarte los dientes en el hotel y barco.\n` +
      `• **Toallitas y pañuelos**: Muy recomendables para llevar en la mochila en las excursiones por el desierto.\n\n` +
      `*Juntos somos más fuertes.*`;
  }

  if (q.includes('quienes') || q.includes('cooperativa') || q.includes('zona de baño') || q.includes('expool') || q.includes('zb aquanatur')) {
    return `🤝 **Grupo Zona de Baño, Soc. COOP.**:\n\n` +
      `• **Historia**: Cooperativa de servicios para profesionales y tiendas de piscinas, jardines, spas y tratamiento de agua, fundada en 2006.\n` +
      `• **Marca Propia**: **ZB Aquanatur** (químicos, filtros, bombas, limpiafondos, cloradores salinos, etc.).\n` +
      `• **Feria Anual**: **Expool** en Amposta (Tarragona).\n` +
      `• **Lema oficial**: *"Juntos somos más fuertes"*.\n\n` +
      `¡Unidos crecemos e impulsamos el sector del agua y la piscina!`;
  }

  return `¡Hola! Como Asistente Virtual Oficial del **Grupo Zona de Baño, Soc. COOP.** y del **Programa Platinum 2026**, estoy a tu entera disposición para resolver cualquier duda sobre nuestro viaje de convivencia a Egipto (del 9 al 16 de octubre de 2026).\n\n` +
    `Puedo informarte sobre:\n` +
    `• 🛂 **Documentación y Pasaporte** (mínimo 6 meses de vigencia).\n` +
    `• ✈️ **Vuelos chárter de Madrid y Barcelona** y horarios de presentación.\n` +
    `• 🧳 **Equipaje y normativa** (maleta 20 kg, powerbanks solo en mano, NO drones).\n` +
    `• 🗺️ **Itinerario día a día** (Aswan, Kom Ombo, Edfu, Luxor, Guiza, Alejandría y El Cairo).\n` +
    `• 🛡️ **Seguro ARAG 24h** y pautas sanitarias.\n` +
    `• 🏆 **Condiciones de calificación Platinum**.\n\n` +
    `Si tienes una consulta personalizada que no esté en la base de datos, por favor consulta directamente con la organización de la cooperativa.\n\n` +
    `¡**Juntos somos más fuertes**! ¿En qué te puedo ayudar hoy?`;
}

// API endpoint for Assistant Chat
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'El mensaje es requerido' });
      return;
    }

    if (genAiClient) {
      try {
        // Build conversational contents with context
        const contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          const recentHistory = history.slice(-6);
          for (const item of recentHistory) {
            if (item.role === 'user' || item.role === 'model') {
              contents.push({
                role: item.role,
                parts: [{ text: item.text }],
              });
            }
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await genAiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        const responseText = response.text || generateFallbackResponse(message);
        res.json({ reply: responseText, source: 'gemini' });
        return;
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to local knowledge engine:', geminiError?.message);
        const fallback = generateFallbackResponse(message);
        res.json({ reply: fallback, source: 'fallback' });
        return;
      }
    } else {
      const fallback = generateFallbackResponse(message);
      res.json({ reply: fallback, source: 'fallback' });
      return;
    }
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: 'Error interno en el asistente virtual. Por favor intenta de nuevo.',
      reply: 'Ha ocurrido un error momentáneo. Por favor consulta con la organización del Grupo Zona de Baño. ¡Juntos somos más fuertes!',
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    appName: 'Zona de Baño Platinum 2026 Virtual Assistant',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
