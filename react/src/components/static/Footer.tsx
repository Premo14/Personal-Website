export default function Footer() {
    return (
        <footer className="bg-surface text-textPrimary text-center py-8 px-4 mt-auto">
            <p className="text-sm mb-6">
                &copy; {new Date().getFullYear()} Anthony Premo. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3 px-2 text-sm sm:text-base">
                {[
                    { text: 'Source Code', href: 'https://github.com/Premo14/personal-website' },
                    { text: 'GitHub', href: 'https://github.com/Premo14' },
                    { text: 'LinkedIn', href: 'https://www.linkedin.com/in/anthony-premo' },
                    { text: 'Email Me', href: 'mailto:ajaipremo@gmail.com' },
                ].map(({ text, href }) => (
                    <a
                        key={text}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-center rounded-md font-medium whitespace-nowrap border border-brand text-brand hover:bg-brand hover:text-white transition w-fit"
                    >
                        {text}
                    </a>
                ))}
            </div>
        </footer>
    );
}
