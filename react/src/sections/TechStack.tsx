import { useEffect, useState } from 'react';
import techStackData from '../data/techStack.json';

type Tool = {
    name: string;
    logo: string;
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

    useEffect(() => {
        setTimeout(() => {
            setToolsByCategory(techStackData);
            setCategories(Object.keys(techStackData));
        }, 100);
    }, []);

    return (
        <section className="snap-start h-full w-full flex flex-col items-center justify-center px-4 py-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">My Tech Stack</h2>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full border text-sm transition font-medium
                            ${activeCategory === cat
                            ? 'text-brand border-brand shadow-sm'
                            : 'text-textMuted border-border hover:text-brand hover:border-brand'}`}

                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {toolsByCategory[activeCategory]?.tools.map((tool) => (
                    <div
                        key={tool.name}
                        className="w-28 h-28 rounded-xl border border-border bg-transparent
             flex flex-col items-center justify-center text-center
             hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_15px_2px_rgba(212,175,55,0.4)]
             transition-all duration-300 ease-in-out"
                    >
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center">
                        <img src={tool.logo} alt={tool.name} className="w-12 h-12 mb-2 filter dark:invert transition" />
                        <span className="text-sm text-textPrimary">{tool.name}</span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
