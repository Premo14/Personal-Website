import Welcome from "../sections/Welcome.tsx";
import TechStack from "../sections/TechStack.tsx";

export default function Home() {
    return (
        <div className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
            <Welcome />
            <TechStack />
        </div>
    );
}
