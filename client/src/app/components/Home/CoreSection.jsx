import React from 'react'
import { m } from "framer-motion";
import OurSolutionTxShield from "../OurSolutionTxShield";

function CoreSection() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            {/* Our Solution / TxShield Core */}
            <m.div
                className="text-center w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <OurSolutionTxShield />
            </m.div>
        </div>
    )
}

export default CoreSection
