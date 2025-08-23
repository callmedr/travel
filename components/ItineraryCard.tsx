import React from 'react';
import { Link } from 'react-router-dom';
import type { Itinerary, City, Attraction } from '../types';
import { CITIES } from '../constants';

interface ItineraryCardProps {
  itinerary: Itinerary;
}

const CITY_THEMES: { [key: string]: { border: string; text: string; } } = {
  oslo: {
    border: 'border-red-500',
    text: 'text-red-600 dark:text-red-400',
  },
  stockholm: {
    border: 'border-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
  },
  helsinki: {
    border: 'border-gray-500',
    text: 'text-gray-600 dark:text-gray-400',
  },
};

const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary }) => {
  const theme = CITY_THEMES[itinerary.cityId] || CITY_THEMES.helsinki;

  const city: City | undefined = CITIES.find(c => c.id === itinerary.cityId);
  const attractionsMap = new Map(city?.attractions.map(att => [att.id, att]));
  const attractionsInItinerary = itinerary.attractionIds
    .map(id => attractionsMap.get(id))
    .filter((att): att is Attraction => !!att);

  return (
    <Link 
      to={`/itinerary/${itinerary.id}`} 
      className={`group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-t-4 ${theme.border}`}
    >
      <div className="p-6 flex-grow flex flex-col">
        <div>
          <p className={`font-semibold mb-2 text-sm ${theme.text}`}>{itinerary.cityName}</p>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{itinerary.title}</h3>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{itinerary.description}</p>
        </div>
        
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">코스 동선</h4>
            <ul>
                {attractionsInItinerary.map((att, index) => (
                    <li key={att.id}>
                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate" title={att.name}>
                            {att.name}
                        </p>
                        {index < attractionsInItinerary.length - 1 && itinerary.travelTimes?.[index] && (
                            <p className="pl-2 text-xs text-gray-500 dark:text-gray-400 my-1">
                                ↓ {itinerary.travelTimes[index]}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </Link>
  );
};

export default ItineraryCard;