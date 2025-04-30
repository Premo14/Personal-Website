import { useEffect, useState } from 'react';
import TechStackForm from '../components/techStack/TechStackForm';
import {API_URL} from "@/API_URL.ts";

type Tool = {
    name: string;
    link: string;
    icon: string;
    categories: string[];
};

type CategoryMap = {
    [category: string]: {
        tools: Tool[];
    };
};

export default function TechStack() {
    const [activeCategory, setActiveCategory] = useState('Frontend');
    const [categories, setCategories] = useState<string[]>([]);
    const [toolsByCategory, setToolsByCategory] = useState<CategoryMap>({});
    const [adminOpen, setAdminOpen] = useState(false);

    useEffect(() => {
        const fetchTechStack = async () => {
            try {
                const response = await fetch(`${API_URL}/tech-stack`);
                const rawData = await response.json();

                const toolsArray: Tool[] = Array.isArray(rawData.tools) ? rawData.tools : [rawData.tools];

                const categorizedTools: CategoryMap = {};

                toolsArray.forEach((tool) => {
                    tool.categories.forEach((category) => {
                        if (!categorizedTools[category]) {
                            categorizedTools[category] = { tools: [] };
                        }
                        categorizedTools[category].tools.push(tool);
                    });
                });

                setToolsByCategory(categorizedTools);
                setCategories(Object.keys(categorizedTools));
            } catch (error) {
                console.error('Failed to fetch tech stack:', error);
            }
        };

        fetchTechStack();
    }, []);

    return (
        <section className="snap-start relative min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center space-y-6 overflow-hidden">
            {/* Background Video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/tech-stack-dark.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Admin Button */}
            <div className="absolute top-4 left-4 z-20">
                <button
                    onClick={() => setAdminOpen(true)}
                    className="px-4 py-2 min-w-[80px] rounded-full border-accent text-accent rounded-md hover:bg-accent hover:text-black transition invert-0"
                >
                    Admin
                </button>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">My Tech Stack</h2>

                {/* Category Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-2 py-2 rounded-full text-sm transition font-medium text-white
                ${activeCategory === cat
                                ? 'text-brand border-brand shadow-sm'
                                : 'text-textMuted hover:text-brand hover:border-brand'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {toolsByCategory[activeCategory]?.tools.map((tool) => (
                        <div
                            key={tool.name}
                            className="w-28 h-28 rounded-xl bg-transparent flex flex-col items-center justify-center text-center hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_15px_2px_rgba(212,175,55,0.4)] transition-all duration-300 ease-in-out"
                        >
                            <a href={tool.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center">
                                <img src={tool.icon} alt={tool.name} className="w-12 h-12 mb-2 filter invert transition" />
                                <span className="text-sm text-white">{tool.name}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Admin Modal */}
            <TechStackForm isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
        </section>
    );
}
