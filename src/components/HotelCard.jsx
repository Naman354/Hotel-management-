import { Link } from 'react-router-dom';

function HotelCard({ hotel }) {
  return (
    <article className="rounded-3xl border border-[#6ebf9e] bg-white p-6 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-4 h-1 w-16 rounded-full bg-[#4f8a6f]" />
          <h2 className="text-xl font-semibold text-[#145a46]">{hotel.name}</h2>
          <p className="mt-1 text-sm text-[#2f6b58]">{hotel.location}</p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
          ★ {hotel.rating}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {hotel.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-lg font-semibold text-[#145a46]">₹{hotel.price}</p>
        <Link
          to={`/hotel/${hotel.id}`}
          className="rounded-full bg-[#155a47] px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-[#0f4732] active:scale-95"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

export default HotelCard;