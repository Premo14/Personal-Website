export default function Footer() {
    return (
        <footer className="bg-surface text-textPrimary text-center py-8 mt-auto">
            <p className="text-sm mb-4">&copy; {new Date().getFullYear()} Anthony Premo. All rights reserved.</p>
            <div className="flex justify-center gap-4 flex-wrap">
                <a
                    href="https://github.com/Premo14/personal-website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md font-semibold transition duration-200 border border-brand text-brand hover:bg-brand hover:text-white"
                >
                    Source Code
                </a>
                <a
                    href="https://github.com/Premo14"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md font-semibold transition duration-200 border border-brand text-brand hover:bg-brand hover:text-white"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/anthony-premo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md font-semibold transition duration-200 border border-brand text-brand hover:bg-brand hover:text-white"
                >
                    LinkedIn
                </a>
                <a
                    href="mailto:ajaipremo@gmail.com"
                    className="px-4 py-2 rounded-md font-semibold transition duration-200 border border-brand text-brand hover:bg-brand hover:text-white"
                >
                    Email Me
                </a>
            </div>
        </footer>
    );
}
