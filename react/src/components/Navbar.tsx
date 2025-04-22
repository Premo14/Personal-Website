import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import useTheme from "../hooks/useTheme.ts";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    return (
        <nav className="bg-surface text-textPrimary px-6 py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl hover:text-brand">Anthony Premo</Link>
                <div className="space-x-4">
                    <Link to="/" className="text-lg hover:text-brand transition">Home</Link>
                    <Link to="/resume" className="text-lg hover:text-brand transition">Resume</Link>
                    <Link to="/projects" className="text-lg hover:text-brand transition">Projects</Link>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md border border-border text-textPrimary hover:text-brand transition"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
