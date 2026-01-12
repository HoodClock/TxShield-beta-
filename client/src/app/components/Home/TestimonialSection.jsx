import React from 'react';
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Ravi Sankar",
        role: "Web 3 Developer",
        content: "Just checked out TxShield — really cool stuff! I can totally see how something like this can help people feel safer when interacting with Web3 apps. The interface is clean, and I love that it's straight to the point.",
        image: "/Images/ravisankar.jpeg",
        linkedin: "https://www.linkedin.com/in/ravi-sankar13/",
        initials: "RS"
    },
    {
        name: "Sarah Chen",
        role: "DeFi Researcher",
        content: "The honeypot detection feature is a lifesaver. I analyze dozens of tokens daily, and TxShield gives me that extra layer of confidence before I recommend anything to my community. Essential tool for any serious crypto user.",
        image: null,
        linkedin: "#",
        initials: "SC"
    },
    {
        name: "Alex Thompson",
        role: "NFT Collector",
        content: "I've lost funds to phishing links before, so the simulation feature is exactly what I needed. Seeing exactly what a transaction will do before I sign it changes everything. The UI is incredibly intuitive too.",
        image: null,
        linkedin: "#",
        initials: "AT"
    }
];

function TestimonialSection() {
    return (
        <section className="relative py-20 px-4 sm:px-6 bg-black overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                            Community Feedback
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        See what developers, traders, and security experts are saying about TxShield.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="relative group"
                        >
                            {/* Gradient Border Background */}
                            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]"></div>
                            
                            {/* Card Content */}
                            <div className="relative h-full bg-black rounded-[23px] p-1 m-[1px] flex flex-col">
                                <div className="bg-[#050505] rounded-[22px] p-8 h-full flex flex-col border border-white/5 group-hover:bg-[#0a0a0a] transition-colors duration-300">
                                    
                                    {/* Quote Icon */}
                                    <div className="mb-6">
                                        <svg className="w-10 h-10 text-purple-500/30" fill="currentColor" viewBox="0 0 32 32">
                                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                        </svg>
                                    </div>

                                    {/* Text */}
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8 flex-grow">
                                        "{testimonial.content}"
                                    </p>

                                    {/* User Info */}
                                    <div className="flex items-center mt-auto pt-6 border-t border-white/5">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all">
                                            {testimonial.image ? (
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div 
                                                className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-white font-bold"
                                                style={{ display: testimonial.image ? 'none' : 'flex' }}
                                            >
                                                {testimonial.initials}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {testimonial.role}
                                            </p>
                                        </div>

                                        {testimonial.linkedin !== "#" && (
                                            <a 
                                                href={testimonial.linkedin} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="ml-auto text-gray-600 hover:text-[#0077b5] transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialSection;