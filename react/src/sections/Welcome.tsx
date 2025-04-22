import { motion } from 'framer-motion';

export default function Welcome() {
    return (
        <section className="relative h-full snap-start flex flex-col justify-center items-center px-4 text-center space-y-6 overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/welcome-dark.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10">
                <motion.h1
                    className="md:text-4xl font-signature text-white"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Hi, I’m Anthony Premo
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl max-w-2xl text-textMuted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    I’m a full stack software engineer actively seeking roles in backend, frontend, DevOps, or software architecture.
                </motion.p>

                <motion.ul
                    className="text-md md:text-lg text-textMuted space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <li>• View my Resume</li>
                    <li>• Explore my Projects</li>
                    <li>• See my Tech Stacks & Tools</li>
                    <li>• Contact me Directly</li>
                </motion.ul>
            </div>
        </section>
    );
}
