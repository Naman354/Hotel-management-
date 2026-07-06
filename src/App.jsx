import { useEffect, useState } from 'react';
import { getHotels } from './services/hotelService';
import HotelCard from './components/HotelCard';

function App() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Hotel Explorer
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Find your perfect stay
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Browse available hotels from the API and explore the details.
          </p>
        </header>

        {loading && (
          <p className="text-slate-600">Loading hotels...</p>
        )}

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && hotels.length === 0 && (
          <p className="text-slate-600">No hotels found.</p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;