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
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
              Hotel Explorer
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Find your perfect stay
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Search by hotel name or location and browse available stays.
            </p>
          </header>

          <div className="mb-6 rounded-[24px] border border-stone-200 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 p-6 text-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
              Handpicked stays
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Discover comfortable hotels in amazing locations
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Browse curated properties and find the right stay for your next trip.
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hotel name or location"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm font-semibold text-slate-500">Hotels</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{hotels.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm font-semibold text-slate-500">Locations</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {new Set(hotels.map((hotel) => hotel.location)).size}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm font-semibold text-slate-500">Top Rated</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {hotels.length > 0
                  ? `${Math.max(...hotels.map((hotel) => Number(hotel.rating))).toFixed(1)}★`
                  : '—'}
              </p>
            </div>
          </div>

          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-medium text-slate-900">Loading hotels...</p>
              <p className="mt-2 text-sm text-slate-600">
                Please wait while we fetch the latest stays.
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
              <p className="font-medium text-red-700">{error}</p>
            </div>
          )}

          {!loading && !error && filteredHotels.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
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