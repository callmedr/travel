import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import CityPage from './screens/CityPage';
import ItineraryPage from './screens/ItineraryPage';

function App() {
  return (
    <HashRouter>
      <main className="text-gray-800 dark:text-gray-200 antialiased">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:cityId" element={<CityPage />} />
          <Route path="/itinerary/:itineraryId" element={<ItineraryPage />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
