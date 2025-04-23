import ResumeUploader from '../components/ResumeUploader';

export default function Resume() {
    return (
        <section className="relative container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-6">My Resume</h1>

            <div className="absolute top-4 right-4 z-10">
                <ResumeUploader />
            </div>

            <div>
                <p className="text-center text-textMuted italic">Resume coming soon...</p>
            </div>
        </section>
    );
}
