import React from 'react'
import ChainDisplay from "../ChainDisplay";
import { motion } from "framer-motion";
import OurSolutionTxShield from "../OurSolutionTxShield";


function ChainSection() {
    return (
        <>
            <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-20 text-center"
                style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <ChainDisplay />
            </motion.h2>

            {/* Our Solution */}
            <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-20 text-center"
                style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <OurSolutionTxShield />
            </motion.h2>
        </>
    )
}

export default ChainSection
