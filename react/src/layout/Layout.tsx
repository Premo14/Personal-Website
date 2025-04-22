import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-background text-textPrimary transition-colors duration-300">
            <Navbar />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
            <Footer />
        </div>
    );
}

