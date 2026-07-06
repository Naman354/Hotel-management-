import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';

function HotelDetailsPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadHotel() {
      try {
        const data = await getHotelById(id);
        setHotel(data);
      } catch (err) {
        setError('Failed to load hotel details.');
      } finally {
        setLoading(false);
      }
    }

    loadHotel();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">Loading hotel details...</p>
          <p className="mt-2 text-sm text-slate-600">
            Please wait while we fetch the latest information.
          </p>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-red-600">{error || 'Hotel not found.'}</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-slate-900 hover:text-slate-700">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Back to hotels
        </Link>

        <h1 className="mt-4 text-3xl font-semibold text-slate-900">{hotel.name}</h1>
        <p className="mt-2 text-slate-600">{hotel.location}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Rating
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900">{hotel.rating}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Price
            </p>
            <p className="mt-2 text-xl font-semibold text-slate-900">₹{hotel.price}</p>
          </div>
        </div>

        <p className="mt-6 text-slate-700 leading-7">{hotel.description}</p>
      </div>
    </div>
  );
}

export default HotelDetailsPage;