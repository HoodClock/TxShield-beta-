'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="w-full max-w-4xl h-96 bg-purple-600 rounded-full blur-[120px] opacity-30"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            ANY VARIATION THAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">FITS YOUR IMAGINATION</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed"
          >
            Find a perfect outfit<br />
            that will suit your soul<br />
            and body
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-bold text-lg tracking-wide hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center gap-2">
              <span>NEW</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating fashion items animation */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 bottom-1/4 opacity-20"
      >
        👕
      </motion.div>
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-20 top-1/3 opacity-20"
      >
        👖
      </motion.div>
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute right-1/4 bottom-1/3 opacity-20"
      >
        👗
      </motion.div>
    </section>
  );
}