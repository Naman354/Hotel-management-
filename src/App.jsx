import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getHotels } from './services/hotelService';
import HotelCard from './components/HotelCard';
import Navbar from './components/Navbar';
import { lazy, Suspense } from 'react';

const HotelDetailsPage = lazy(() => import('./pages/HotelDetailsPage'));

function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadHotels() {
      try {
        const data = await getHotels();
        setHotels(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load hotels.');
      } finally {
        setLoading(false);
      }
    }

    loadHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
  const query = searchTerm.toLowerCase();
  const name = hotel?.name?.toLowerCase() ?? '';
  const location = hotel?.location?.toLowerCase() ?? '';

  return name.includes(query) || location.includes(query);
});

  return (
    <div className="home-page-background min-h-screen"> 
      <Navbar />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6">
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Find your perfect stay
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Find the best hotels at the cheapest price.
            </p>
          </header>

          <div className="mb-6 rounded-[24px] border border-[#6ebf9e] bg-gradient-to-br from-[#b9e9d5] via-[#8eceb2] to-[#d8f4e4] p-6 text-[#145a46] shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#145a46]">
              Fresh stays
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#145a46]">
              Discover hotels with easy search and polished details
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#2f6b58]">
              Browse curated properties in the best locations and find the right stay.
            </p>
            <div className="mt-4 inline-flex rounded-full bg-[#145a46] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">
              At the best prices
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-[#6ebf9e] bg-gradient-to-r from-[#eafaf2] to-[#dbeee7] p-4 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hotel name or location"
              className="w-full rounded-xl border border-[#2a7d65] bg-[#f3fbfa] px-4 py-3 text-sm outline-none placeholder:text-[#2f6b58] focus:border-[#155a47] focus:ring-2 focus:ring-[#8eceb2] transition"
            />
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#6ebf9e] bg-gradient-to-br from-[#eafaf2] to-[#d8f4e4] p-4 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-sm font-semibold text-[#2f6b58]">Hotels</p>
              <p className="mt-2 text-2xl font-semibold text-[#145a46]">{hotels.length}</p>
            </div>
            <div className="rounded-2xl border border-[#6ebf9e] bg-gradient-to-br from-[#eafaf2] to-[#d8f4e4] p-4 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-sm font-semibold text-[#2f6b58]">Locations</p>
              <p className="mt-2 text-2xl font-semibold text-[#145a46]">
                {new Set(hotels.map((hotel) => hotel.location)).size}
              </p>
            </div>
            <div className="rounded-2xl border border-[#6ebf9e] bg-gradient-to-br from-[#eafaf2] to-[#d8f4e4] p-4 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-sm font-semibold text-[#2f6b58]">Top Rated</p>
              <p className="mt-2 text-2xl font-semibold text-[#145a46]">
                {hotels.length > 0
                  ? `${Math.max(...hotels.map((hotel) => Number(hotel.rating))).toFixed(1)}★`
                  : '—'}
              </p>
            </div>
          </div>

          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
              <p className="text-lg font-medium text-slate-900">Loading hotels...</p>
              <p className="mt-2 text-sm text-slate-600">
                Please wait while we fetch the latest stays.
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-lg">
              <p className="font-medium text-red-700">{error}</p>
            </div>
          )}

          {!loading && !error && filteredHotels.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-lg">
              <p className="text-lg font-medium text-slate-900">No hotels found</p>
              <p className="mt-2 text-sm text-slate-600">
                Try a different hotel name or location.
              </p>
            </div>
          )}
          {!loading && !error && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="mt-10 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Built with React, Tailwind CSS, and the hotel API.
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/hotel/:id"
          element={
            <Suspense fallback={<div className="p-6 text-slate-600">Loading page...</div>}>
              <HotelDetailsPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;