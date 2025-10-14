import React from 'react'
import { motion } from "framer-motion";


function TestimonialSection() {
    return (
        <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0A0A0A] to-black overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-cyan-500/10 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-20 text-center"
                    style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                        What People Say
                    </span>
                    <br className="md:hidden" /> About Our Platform
                </motion.h2>

                <div className="flex justify-center">
                    <motion.div
                        className="w-full max-w-3xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative p-0.5 rounded-3xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 backdrop-blur-sm">
                            <div className="bg-[#0F0F0F] rounded-3xl p-6 sm:p-8 md:p-10">
                                <svg
                                    className="w-8 sm:w-12 h-8 sm:h-12 mb-6 text-cyan-400 opacity-20"
                                    fill="currentColor"
                                    viewBox="0 0 32 32"
                                >
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                </svg>

                                <blockquote className="text-base sm:text-xl md:text-2xl leading-relaxed text-gray-300 mb-6 sm:mb-8">
                                    Just checked out TxShield — really cool stuff! I can totally see how something like this can help people feel safer when interacting with Web3 apps. The interface is clean, and I love that it's straight to the point without being overwhelming.
                                    <br />
                                    <br />
                                    Definitely a solid idea, especially with so many sketchy contracts out there. Would be awesome to see it evolve further.
                                </blockquote>

                                <div className="flex items-center">
                                    <div className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-full overflow-hidden border-2 border-cyan-400/30 mr-4">
                                        <img
                                            src="/Images/ravisankar.jpeg"
                                            alt="User profile"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMnptMCAyYzIuMzkyIDAgNC41MzUuODQzIDYuMTg5IDIuMjUzbC0yLjE0OCAxLjE0OEMxNC42NjkgNi4wNTkgMTMuNDA5IDYgMTIgNmMtMS40MDkgMC0yLjY2OS4wNTktMy44NDEuNDAxTDYuMDExIDQuMjUzQzcuNjY1IDIuODQzIDkuNjA4IDIgMTIgMnptMCAxOEM5LjYxOCAyMCA3LjQzNCAxOS4xNTcgNS43MDkgMTcuNTQ0bDEuNDMxLTEuNDMxQzguMDYzIDE2LjQyOSA5LjkyMyAxNyAxMiAxN3MyLjkzNy0uNTcxIDQuMDYxLTEuODg3bDEuNDMxIDEuNDMxQzE2LjU2NiAxOS4xNTcgMTQuMzgyIDIwIDEyIDIwem0tNi0xMGMwIDEuNjU3IDEuMzQzIDMgMyAzczMtMS4zNDMgMy0zLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzem0zLTMuNWMwIC44MjguNjcyIDEuNSAxLjUgMS41cyAxLjUtLjY3MiAxLjUtMS41LS42NzItMS41LTEuNS0xLjUtMS41LjY3Mi0xLjUgMS41eiIgZmlsbD0iI2RkZGRkZCIgLz48L3N2Zz4=";
                                            }}
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                                            <svg
                                                className="w-2 sm:w-3 h-2 sm:h-3 text-black"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="font-bold text-white text-sm sm:text-base">Ravi Sankar</div>
                                        <div className="text-xs sm:text-sm text-cyan-400">
                                            Web 3 Developer
                                        </div>
                                        <a
                                            href="https://www.linkedin.com/in/ravi-sankar13/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-xs text-gray-400 hover:text-cyan-400 mt-1"
                                        >
                                            <svg
                                                className="w-3 sm:w-4 h-3 sm:h-4 mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                            View LinkedIn Profile
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-20 -right-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-cyan-500/10 blur-3xl -z-10"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialSection
