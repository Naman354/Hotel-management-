import { Link } from 'react-router-dom';

function HotelCard({ hotel }) {
    return (
        <article className="rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">{hotel.name}</h2>                        {hotel.name}
                    <p className="mt-1 text-sm text-slate-500">{hotel.location}</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                    ★ {hotel.rating}  
                </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
                {hotel.description}
            </p>

            <div className="mt-5 flex items-center justify-between">
                <p className="text-lg font-semibold text-slate-900">₹{hotel.price}</p>
                <Link
                to={`/hotel/${hotel.id}`}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
                    View details
                </Link>
            </div>
        </article>
    );
}

export default HotelCard;