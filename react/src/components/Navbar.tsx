import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Anthony Premo</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/resume" className="hover:underline">Resume</Link>
                    <Link to="/projects" className="hover:underline">Projects</Link>
                </div>
            </div>
        </nav>
    );
}
