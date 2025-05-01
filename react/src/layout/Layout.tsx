import { ReactNode } from 'react';
import Navbar from '@/components/static/Navbar.tsx';
import Footer from '@/components/static/Footer.tsx';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-background text-textPrimary transition-colors duration-300">
            <Navbar />
            <main className="relative flex-1 overflow-y-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
}
