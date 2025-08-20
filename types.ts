export interface Attraction {
  id: string;
  name: string;
  name_local: string;
  location: string;
  duration: string;
  bestTimeToVisit: string;
  ticket: string;
  historicalSignificance: string[];
  highlights: string[];
  culturalRelevance: string[];
  facilities?: string[];
  tip?: string;
  googleMapsUrl: string;
  subway?: string;
  culturalContext?: {
    media?: string[];
    literature?: string[];
    anecdotes?: string[];
  };
  artAndArchitecture?: {
    style?: string[];
    restoration?: string[];
    details?: string[];
  };
}

export interface City {
  id: string;
  name: string;
  country: string;
  attractions: Attraction[];
}

export interface Itinerary {
  id: string;
  cityId: string;
  cityName: string;
  title: string;
  description: string;
  attractionIds: string[];
  travelTimes?: string[];
}