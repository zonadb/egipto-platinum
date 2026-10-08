export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  source?: 'gemini' | 'fallback';
}

export interface FlightLeg {
  flightNumber: string;
  airline: string;
  route: string;
  fromCode: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  terminal: string;
  date: string;
  notes: string;
}

export interface CityFlights {
  city: 'Madrid' | 'Barcelona';
  airline: string;
  presentationHours: number;
  presentationTimeIda: string;
  outbound: FlightLeg;
  inbound: FlightLeg;
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  location: string;
  accommodation: string;
  regime: string;
  description: string;
  highlights: string[];
  tips?: string;
  iconType: 'flight' | 'temple' | 'cruise' | 'pyramids' | 'city' | 'alexandria' | 'night';
}

export interface QualificationStatus {
  purchases: number;
  aquanaturPoints: number;
  hasFirstPass: boolean;
  hasSecondPass: boolean;
  missingForFirst: {
    purchases: number;
    points: number;
  };
  missingForSecond: {
    purchases: number;
  };
}

export interface ChecklistItem {
  id: string;
  category: 'documentos' | 'electronica' | 'aseo' | 'salud' | 'ropa' | 'dinero';
  title: string;
  detail: string;
  critical?: boolean;
  isCustom?: boolean;
}

export interface WeatherCity {
  id: string;
  name: string;
  region: string;
  tempDay: number;
  tempNight: number;
  condition: string;
  icon: 'sun' | 'sun-cloud' | 'wind' | 'thermometer';
  uvIndex: number;
  humidity: number;
  highlights: string;
  clothingTip: string;
  dates: string;
}

