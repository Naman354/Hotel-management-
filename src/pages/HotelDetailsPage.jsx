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
      <div className="flex min-h-screen items-center justify-center bg-[#e8f3eb] px-4 py-8">
        <div className="rounded-[24px] border border-[#cfe1d5] bg-[#f6fdf6] px-8 py-6 text-center shadow-sm">
          <p className="text-lg font-semibold text-[#355546]">Loading hotel details...</p>
          <p className="mt-2 text-sm text-[#5e7366]">
            Please wait while we fetch the latest information.
          </p>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-[#e8f3eb] px-4 py-8">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-[#cfe1d5] bg-[#f6fdf6] p-8 shadow-sm">
          <p className="text-[#3b5045]">{error || 'Hotel not found.'}</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center rounded-full border border-[#b8d3c4] px-4 py-2 text-sm font-medium text-[#426956] transition hover:bg-[#e3f1e9]"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dbeee7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] bg-gradient-to-br from-[#155a47] via-[#2a7d65] to-[#cbe9dd] px-6 py-10 text-white shadow-[0_12px_30px_rgba(57,83,72,0.18)] sm:px-8 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-[#f8efe6] backdrop-blur-sm transition hover:bg-white/20"
          >
            ← Back to home
          </Link>

          <div className="mt-8 grid gap-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#dce5d7]">
                Luxury retreat
              </p>
              <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{hotel.name}</h1>
              <p className="mt-4 text-lg text-[#e9f1ea]">{hotel.location}</p>
            </div>

            <div className="rounded-[20px] border border-white/30 bg-white/15 p-5 shadow-[0_8px_25px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f3e0bf]">
                From
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">₹{hotel.price}</p>
              <p className="mt-2 text-sm text-[#f3e0bf]">per night</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[24px] border border-[#cfe1d5] bg-[#f5faf4] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
              <h2 className="text-2xl font-semibold text-[#314c40]">About this stay</h2>
              <p className="mt-4 text-base leading-8 text-[#536d61]">{hotel.description}</p>
            </div>

            <div className="rounded-[24px] border border-[#cfe1d5] bg-[#f5faf4] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-lg font-semibold text-[#314c40]">What makes it special</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#536d61]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#698a7c]">●</span>
                  <span>Comfortable rooms with thoughtful design and premium amenities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#5f7f6f]">●</span>
                  <span>Great location for both leisure stays and short business trips.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#5f7f6f]">●</span>
                  <span>Warm hospitality and a relaxing atmosphere throughout the property.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-[#cfe1d5] bg-[#f5faf4] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6a8775]">
                Guest rating
              </p>
              <p className="mt-3 text-4xl font-semibold text-[#314c40]">{hotel.rating}</p>
              <p className="mt-2 text-sm text-[#536d61]">Excellent reviews from travelers</p>
            </div>

            <div className="rounded-[24px] border border-[#2a7d65] bg-[#155a47] p-6 text-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c6d9c7]">
                Stay experience
              </p>
              <p className="mt-3 text-xl font-semibold">A calm and refined escape.</p>
              <p className="mt-2 text-sm leading-7 text-[#e6eee8]">
                Enjoy a comfortable stay, quality service, and a memorable atmosphere.
              </p>
              <button className="mt-5 rounded-full bg-[#f5faf4] px-4 py-2 text-sm font-semibold text-[#155a47] transition hover:bg-[#e3efe7]">
                Reserve this stay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetailsPage;