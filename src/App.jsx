import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getHotels } from './services/hotelService';
import HotelCard from './components/HotelCard';
import HotelDetailsPage from './pages/HotelDetailsPage';
import Navbar from './components/Navbar';

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

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hotel name or location"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          {loading && <p className="text-slate-600">Loading hotels...</p>}

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && filteredHotels.length === 0 && (
            <p className="text-slate-600">No hotels match your search.</p>
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
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel/:id" element={<HotelDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;