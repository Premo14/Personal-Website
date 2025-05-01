import Welcome from "@/sections/Welcome.tsx";
import TechStack from "@/sections/TechStack.tsx";

export default function Home() {
    return (
        <div className="h-full snap-y snap-mandatory scroll-smooth overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-white scrollbar-track-[#121212]">
            <Welcome />
            <TechStack />
        </div>
    );
}
