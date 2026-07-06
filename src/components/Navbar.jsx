import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header className="border-b border-slate-200 bg-white shadow-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="text-lg font-semibold text-slate-900">
                    Hotel Explorer
                </Link>
                <nav>
                    <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                        Home
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;