import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
            <Navbar />
            <main className="flex-1 px-4 py-8 container mx-auto">{children}</main>
            <Footer />
        </div>
    );
}
