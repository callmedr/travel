import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CITIES, ITINERARIES } from '../constants';
import type { City, Attraction, Itinerary } from '../types';
import AttractionCard from '../components/AttractionCard';
import ShareButton from '../components/ShareButton';
import { ArrowLeftIcon, ClockIcon } from '../components/icons';

const ItineraryPage: React.FC = () => {
  const { itineraryId } = useParams<{ itineraryId: string }>();
  const itinerary: Itinerary | undefined = ITINERARIES.find(i => i.id === itineraryId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itineraryId]);
  
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
  
  if (!itinerary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">코스를 찾을 수 없습니다.</h2>
        <Link to="/" className="text-blue-500 dark:text-blue-400 hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  const city: City | undefined = CITIES.find(c => c.id === itinerary.cityId);
  const attractionsInItinerary: Attraction[] = city?.attractions.filter(
      att => itinerary.attractionIds.includes(att.id)
  ) || [];
  
  // itinerary.attractionIds 순서대로 명소 정렬
  const sortedAttractions = attractionsInItinerary.sort((a, b) => {
      return itinerary.attractionIds.indexOf(a.id) - itinerary.attractionIds.indexOf(b.id);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex justify-between items-center mb-8 sticky top-0 py-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
            <Link to="/" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <ArrowLeftIcon />
                <span className="font-semibold">홈으로</span>
            </Link>
            <ShareButton />
        </header>

        <div className="text-center mb-12">
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{itinerary.cityName}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">{itinerary.title}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">{itinerary.description}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">코스 순서</h2>
            <ul className="space-y-2">
                {sortedAttractions.map((attraction, index) => (
                    <React.Fragment key={attraction.id}>
                        <li>
                            <div className="flex items-center">
                                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300 font-bold text-md">{index + 1}</span>
                                <a href={`#${attraction.id}`} onClick={(e) => handleScrollToAttraction(e, attraction.id)} className="ml-4 text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors duration-200 font-medium cursor-pointer">
                                    {attraction.name}
                                </a>
                            </div>
                        </li>
                        {index < sortedAttractions.length - 1 && itinerary.travelTimes?.[index] && (
                            <li className="pl-4">
                                 <div className="flex items-center h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600 ml-[15px]">
                                    <div className="flex items-center pl-5 text-sm text-gray-500 dark:text-gray-400">
                                        <ClockIcon className="h-4 w-4 mr-2" />
                                        <span>{itinerary.travelTimes[index]} 이동</span>
                                    </div>
                                </div>
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>

        <div className="space-y-8">
            {sortedAttractions.map((attraction, index) => (
              <div key={attraction.id} id={attraction.id} className="scroll-mt-24">
                <AttractionCard attraction={attraction} index={index + 1} />
              </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default ItineraryPage;