import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header className="bg-gradient-to-r from-[#b9e9d5] via-[#8eceb2] to-[#d8f4e4] backdrop-blur-sm border-b border-[#6ebf9e] shadow-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="text-lg font-semibold text-[#145a46]">
                    Hotel Explorer
                </Link>
                <nav>
                    <Link to="/" className="text-sm font-medium text-[#1b6f55] transition duration-200 hover:text-[#0f4732]">
                        Home
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;