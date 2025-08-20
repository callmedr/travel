import React from 'react';
import { Link } from 'react-router-dom';
import type { City } from '../types';

interface CityCardProps {
  city: City;
}

const CITY_COLORS: { [key: string]: string } = {
  oslo: 'bg-gradient-to-br from-red-500 to-blue-600',
  stockholm: 'bg-gradient-to-br from-blue-500 to-yellow-400',
  helsinki: 'bg-gradient-to-br from-blue-400 to-gray-200',
};

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const bgColor = CITY_COLORS[city.id] || 'bg-gray-700';

  return (
    <Link 
      to={`/city/${city.id}`} 
      className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className={`flex flex-col items-center justify-center w-full h-80 ${bgColor}`}>
        <div className="text-center p-6 transform transition-transform duration-300 group-hover:scale-105">
          <h2 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">{city.name}</h2>
          <p className="mt-2 text-lg text-white/90 drop-shadow-md">{city.country}</p>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
