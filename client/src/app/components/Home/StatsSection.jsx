import React, { useRef } from 'react'
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { FiShield, FiAlertTriangle, FiZap } from 'react-icons/fi'
import TiltedCard from '../TiltedCard'

// Smooth path generator using Catmull-Rom to Cubic Bezier conversion
const generateSmoothPath = (data, width, height) => {
    if (!data || data.length < 2) return "";

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1);

    // Map value to Y coordinate (inverted because SVG y=0 is top)
    const getY = (val) => height - ((val - min) / range * height);
    const getX = (index) => index * step;

    const points = data.map((val, i) => ({ x: getX(i), y: getY(val) }));

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i]; // clamped for start (though tripleData handles this)
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2; // clamped for end

        // Catmull-Rom tension (0.2 gives a nice curve, not too loose)
        const tension = 0.2; 

        const cp1x = p1.x + (p2.x - p0.x) * tension;
        const cp1y = p1.y + (p2.y - p0.y) * tension;

        const cp2x = p2.x - (p3.x - p1.x) * tension;
        const cp2y = p2.y - (p3.y - p1.y) * tension;

        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return d;
}

function StatsSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	const container = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: 0.12
			}
		}
	}

	const card = {
		hidden: { opacity: 0, y: 12 },
		show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
	}

	const stats = [
		{
			id: 1,
			icon: <FiShield className="w-6 h-6 text-white" />,
			title: 'Honeypot Scams',
			value: 12.7,
			suffix: 'M',
			meta: '3,200+ cases',
            data: [5, 4.5, 4, 3.5, 4, 5, 6, 7, 7.5, 8, 7, 6], 
            color: "#EF4444" 
		},
		{
			id: 2,
			icon: <FiAlertTriangle className="w-6 h-6 text-white" />,
			title: 'Advanced Threats',
			value: 23.4,
			suffix: 'M',
			meta: '5,800+ cases',
            data: [10, 9.5, 9, 8.5, 9, 10.5, 12, 13, 14, 14.5, 13, 11], 
            color: "#F59E0B"
		},
		{
			id: 3,
			icon: <FiZap className="w-6 h-6 text-white" />,
			title: 'Revert Transactions',
			value: 8.2,
			suffix: 'M',
			meta: 'ongoing',
            data: [4, 3.5, 3, 2.5, 3, 4, 5, 6, 6.5, 7, 6, 5], 
            color: "#3B82F6"
		}
	]

	return (
		<section ref={ref} className="relative py-8 sm:py-12 px-4 sm:px-6">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center mb-8 sm:mb-10"
				>
					<div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/6 mb-3 sm:mb-4">
						<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full animate-pulse"></div>
						<span className="text-xs sm:text-sm text-gray-300 uppercase">Security Alert</span>
					</div>

					<h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-2 px-4"><span className="grad-word">Threats</span> at a glance</h3>
					<p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">Key indicators condensed into clear, actionable metrics.</p>
				</motion.div>

				<motion.div variants={container} initial="hidden" animate={isInView ? 'show' : 'hidden'} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
					{stats.map(s => {
                        // Triple the data: [Cycle 1, Cycle 2, Cycle 3]
                        const tripleData = [...s.data, ...s.data, ...s.data];
                        
                        // Total points in triple data
                        const totalPoints = tripleData.length;
                        // Points in one cycle
                        const cyclePoints = s.data.length;
                        
                        // Total width of the path (arbitrary base width)
                        const totalWidth = 900; 
                        
                        // Generate smooth path
                        const pathD = generateSmoothPath(tripleData, totalWidth, 30);

                        // Calculate slide percentages
                        // We slide by exactly one cycle length.
                        // One cycle length in steps = cyclePoints (if we wrap start-to-start)
                        // Actually, distance between Index 0 and Index L is L steps.
                        // Total width corresponds to (3L - 1) steps.
                        // Slide % = (L / (3L - 1)) * 100
                        const oneCyclePercent = (cyclePoints / (totalPoints - 1)) * 100;
                        
                        // Start sliding from the beginning of the 2nd cycle (Index L)
                        const startX = -oneCyclePercent;
                        // End sliding at the beginning of the 3rd cycle (Index 2L)
                        const endX = -(oneCyclePercent * 2);

                        return (
						<motion.div key={s.id} variants={card}>
							<TiltedCard className="group h-full relative">
                                {/* 1. Glow Layer (Behind the card face) */}
                                <div className="absolute inset-0 rounded-xl bg-purple-500/0 group-hover:bg-purple-500/20 transition-all duration-500 blur-2xl -z-10 translate-y-4 opacity-0 group-hover:opacity-100"></div>
                                
                                {/* 2. Card Face */}
								<div className="relative z-10 h-full rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm flex flex-col justify-between overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                    <div className="relative z-20 mb-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="inline-flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                                                    <div className="relative z-10">{s.icon}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{s.title}</div>
                                                    <div className="text-xs text-gray-500">{s.meta}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent group-hover:text-white transition-all duration-300">
                                            $<CountUp end={s.value} decimals={1} duration={1.8} />{s.suffix}
                                        </div>
                                    </div>

                                    {/* 3. Scrolling Trend Graph */}
                                    <div className="h-10 w-full relative z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                                        {/* Container width is sufficient to hold the rendered path. 
                                            We make it 300% to ensure high res, but the slide is calculated via % relative to this container. */}
                                        <motion.div 
                                            className="h-full flex"
                                            style={{ width: "300%" }}
                                            animate={{ x: [`${startX}%`, `${endX}%`] }}
                                            transition={{ 
                                                repeat: Infinity, 
                                                ease: "linear", 
                                                duration: 10 // Adjust speed here
                                            }}
                                        >
                                             <svg viewBox={`0 0 ${totalWidth} 30`} className="w-full h-full overflow-visible">
                                                <defs>
                                                    <linearGradient id={`grad-${s.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor={s.color} stopOpacity="0" />
                                                        <stop offset="100%" stopColor={s.color} stopOpacity="1" />
                                                    </linearGradient>
                                                </defs>
                                                <path 
                                                    d={pathD} 
                                                    fill="none" 
                                                    stroke={`url(#grad-${s.id})`} 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round"
                                                    className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                                                />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors relative z-20 mt-2">Concise context copy that explains the metric and why it matters.</div>
                                </div>
							</TiltedCard>
						</motion.div>
					)})}
				</motion.div>

				<div className="mt-6 sm:mt-8 text-center px-4">
					<a href="/simulate" className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-white/10 text-white font-medium text-sm sm:text-base shadow-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto justify-center">
						<span className="relative z-10">Run a quick scan</span>
					</a>
				</div>
			</div>
		</section>
	)
}

export default StatsSection;