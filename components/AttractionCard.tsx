import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Attraction } from '../types';
import { ITINERARIES } from '../constants';
import { 
  MapPinIcon, 
  LocationMarkerIcon,
  ClockIcon,
  SunIcon,
  TicketIcon,
  StarIcon,
  BuildingIcon,
  BulbIcon,
  SubwayIcon,
  HistoryIcon,
  CultureIcon,
  ArrowUpIcon,
  ClipboardListIcon,
  XIcon,
  FilmIcon,
  BookOpenIcon,
  SparklesIcon,
  ArtArchitectureIcon,
  EyeIcon,
} from './icons';

interface AttractionCardProps {
  attraction: Attraction;
  index: number;
}

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">{icon}</div>
        <div className="ml-3">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
            <dd className="mt-1 text-base text-gray-900 dark:text-gray-100">{value}</dd>
        </div>
    </div>
);

const ListInfoItem: React.FC<{ icon: React.ReactNode; label: string; items: string[] }> = ({ icon, label, items }) => (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex items-start">
            <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">{icon}</div>
            <div className="ml-3 w-full">
                <h4 className="text-sm font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">{label}</h4>
                <ul className="mt-2 list-disc list-inside space-y-1 text-base text-gray-900 dark:text-gray-100">
                    {items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        </div>
    </div>
);

const SubSection: React.FC<{ icon: React.ReactNode; title: string; items?: string[] }> = ({ icon, title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex items-start mt-4">
        <div className="flex-shrink-0 text-gray-500 dark:text-gray-400 pt-1">{icon}</div>
        <div className="ml-3">
            <p className="font-semibold text-gray-700 dark:text-gray-300">{title}</p>
            <ul className="mt-1 list-disc list-inside space-y-1 text-base text-gray-900 dark:text-gray-100">
                {items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </div>
    </div>
  );
};


const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, index }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    
    const handleItineraryClick = (itineraryId: string) => {
        navigate(`/itinerary/${itineraryId}`);
    };

    const relevantItineraries = ITINERARIES.filter(itinerary => 
        itinerary.attractionIds.includes(attraction.id)
    );
    
  return (
    <>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-blue-500/50">
        <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
            <span className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-300 font-bold text-xl">{index}</span>
            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{attraction.name}</h3>
                <p className="text-md text-gray-500 dark:text-gray-400">{attraction.name_local}</p>
            </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <InfoItem icon={<LocationMarkerIcon />} label="위치" value={attraction.location} />
            <InfoItem icon={<ClockIcon />} label="소요 시간" value={attraction.duration} />
            <InfoItem icon={<SunIcon />} label="추천 시간대" value={attraction.bestTimeToVisit} />
            <InfoItem icon={<TicketIcon />} label="입장료" value={attraction.ticket} />
            {attraction.subway && (
                <InfoItem icon={<SubwayIcon />} label="가까운 지하철역" value={attraction.subway} />
            )}
            </div>
            
            <ListInfoItem icon={<HistoryIcon />} label="역사적 의미" items={attraction.historicalSignificance} />
            
            <ListInfoItem icon={<StarIcon />} label="추천 포인트" items={attraction.highlights} />

            {attraction.culturalContext && (
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 text-gray-500 dark:text-gray-400"><CultureIcon /></div>
                        <div className="ml-3 w-full">
                            <h4 className="text-sm font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">문화적 맥락</h4>
                            <SubSection icon={<FilmIcon className="h-5 w-5"/>} title="미디어 속 모습" items={attraction.culturalContext.media} />
                            <SubSection icon={<BookOpenIcon className="h-5 w-5"/>} title="문학 속 모습" items={attraction.culturalContext.literature} />
                            <SubSection icon={<SparklesIcon className="h-5 w-5"/>} title="숨겨진 이야기" items={attraction.culturalContext.anecdotes} />
                        </div>
                    </div>
                </div>
            )}

            {attraction.artAndArchitecture && (
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 text-gray-500 dark:text-gray-400"><ArtArchitectureIcon /></div>
                        <div className="ml-3 w-full">
                            <h4 className="text-sm font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">🎨 예술 & 건축</h4>
                            <SubSection icon={<BuildingIcon className="h-5 w-5" />} title="건축 양식" items={attraction.artAndArchitecture.style} />
                            <SubSection icon={<HistoryIcon className="h-5 w-5" />} title="복원 역사" items={attraction.artAndArchitecture.restoration} />
                            <SubSection icon={<EyeIcon className="h-5 w-5" />} title="숨겨진 디테일" items={attraction.artAndArchitecture.details} />
                        </div>
                    </div>
                </div>
            )}
            
            {attraction.facilities && attraction.facilities.length > 0 && (
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <InfoItem icon={<BuildingIcon />} label="편의시설" value={attraction.facilities.join(', ')} />
                </div>
            )}

            {attraction.tip && (
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6 bg-blue-50 dark:bg-gray-700/50 -mx-8 -mb-8 px-8 py-6 rounded-b-xl">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 text-yellow-500 dark:text-yellow-400"><BulbIcon /></div>
                        <div className="ml-3">
                            <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">현지 꿀팁</dt>
                            <dd className="mt-1 text-base text-gray-800 dark:text-gray-100">{attraction.tip}</dd>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-end items-center gap-4">
                <button
                    type="button"
                    onClick={handleScrollToTop}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-200"
                >
                    <ArrowUpIcon />
                    <span>다른 곳 보기</span>
                </button>
                {relevantItineraries.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-200"
                    >
                        <ClipboardListIcon />
                        <span>추천 여행 코스</span>
                    </button>
                )}
                <a 
                    href={attraction.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-200"
                >
                    <MapPinIcon />
                    <span>지도에서 보기</span>
                </a>
            </div>
        </div>
        </div>

        {isModalOpen && (
            <div 
                className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300"
                onClick={() => setIsModalOpen(false)}
            >
                <div 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-lg mx-4 transform transition-all duration-300 scale-95 opacity-0 animate-modal-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">추천 코스</h4>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">'{attraction.name}'이(가) 포함된 코스입니다.</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            aria-label="Close modal"
                        >
                            <XIcon />
                        </button>
                    </div>
                    <ul className="space-y-3 mt-6 max-h-80 overflow-y-auto pr-2">
                        {relevantItineraries.map(it => (
                            <li key={it.id}>
                                <button 
                                    type="button"
                                    onClick={() => handleItineraryClick(it.id)}
                                    className="block w-full text-left p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 hover:ring-2 hover:ring-blue-500 transition-all duration-200 focus:outline-none"
                                >
                                    <p className="font-semibold text-blue-600 dark:text-blue-400">{it.cityName}</p>
                                    <p className="font-bold text-gray-800 dark:text-gray-100 mt-1">{it.title}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <style>{`
                    @keyframes modal-in {
                        to {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                    .animate-modal-in {
                        animation: modal-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                    }
                `}</style>
            </div>
        )}
    </>
  );
};

export default AttractionCard;