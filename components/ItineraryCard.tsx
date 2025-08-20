import React from 'react';
import { Link } from 'react-router-dom';
import type { Itinerary } from '../types';
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

  return (
    <Link 
      to={`/itinerary/${itinerary.id}`} 
      className={`group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-t-4 ${theme.border}`}
    >
      <div className="p-6 flex-grow flex flex-col">
        <p className={`font-semibold mb-2 text-sm ${theme.text}`}>{itinerary.cityName}</p>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-grow leading-tight">{itinerary.title}</h3>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{itinerary.description}</p>
      </div>
    </Link>
  );
};

export default ItineraryCard;
