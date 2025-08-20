import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CITIES } from '../constants';
import type { City } from '../types';
import AttractionCard from '../components/AttractionCard';
import ShareButton from '../components/ShareButton';
import { ArrowLeftIcon } from '../components/icons';

const CityPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const city: City | undefined = CITIES.find(c => c.id === cityId);

  const handleScrollToAttraction = (event: React.MouseEvent<HTMLAnchorElement>, attractionId: string) => {
    event.preventDefault();
    const element = document.getElementById(attractionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      window.history.pushState(null, '', `#${attractionId}`);
    }
  };

  if (!city) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">도시를 찾을 수 없습니다.</h2>
        <Link to="/" className="text-blue-500 dark:text-blue-400 hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-8 sticky top-0 py-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
            <Link to="/" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <ArrowLeftIcon />
                <span className="font-semibold">도시 선택</span>
            </Link>
            <ShareButton />
        </header>

        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">{`${city.name} Top ${city.attractions.length} 명소`}</h1>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">{city.country}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">명소 목록</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                {city.attractions.map(attraction => (
                    <li key={attraction.id}>
                        <a href={`#${attraction.id}`} onClick={(e) => handleScrollToAttraction(e, attraction.id)} className="text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors duration-200 font-medium cursor-pointer">
                            {attraction.name}
                        </a>
                    </li>
                ))}
            </ol>
        </div>

        <div className="space-y-8">
            {city.attractions.map((attraction, index) => (
              <div key={attraction.id} id={attraction.id} className="scroll-mt-24">
                <AttractionCard attraction={attraction} index={index + 1} />
              </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default CityPage;