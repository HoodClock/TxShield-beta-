import React from 'react'
import ChainDisplay from "../ChainDisplay";
import { motion } from "framer-motion";
import OurSolutionTxShield from "../OurSolutionTxShield";


function ChainSection() {
    return (
        <>
            <motion.div
                className="mb-12 sm:mb-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <ChainDisplay />
            </motion.div>

            {/* Our Solution */}
            <motion.div
                className="mb-12 sm:mb-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <OurSolutionTxShield />
            </motion.div>
        </>
    )
}

export default ChainSection
