import React, { useState } from 'react';
import { CITIES, ITINERARIES } from '../constants';
import CityCard from '../components/CityCard';
import ItineraryCard from '../components/ItineraryCard';

const HomePage: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>(CITIES[0]?.id || '');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">북유럽 수도 여행 가이드</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">오슬로, 스톡홀름, 헬싱키의 핵심 명소와 추천 여행 코스를 만나보세요.</p>
        </header>
        
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">도시별 명소 보기</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {CITIES.map(city => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
        </section>

        <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">추천! 4시간 여행 코스</h2>
            
            <div className="flex justify-center mb-10 border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {CITIES.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCityId(city.id)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 focus:outline-none ${
                      selectedCityId === city.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                    }`}
                    aria-current={selectedCityId === city.id ? 'page' : undefined}
                  >
                    {city.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ITINERARIES
                .filter(itinerary => itinerary.cityId === selectedCityId)
                .map(itinerary => (
                  <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                ))}
            </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;