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

			// Volatile, spiky data for scams

			data: [4, 8, 5, 9, 6, 12, 8, 15, 10, 14, 9, 11, 5, 9],

			color: "#EF4444",

			speed: 12,

			description: "Cumulative capital lost to exit-scam contracts globally, highlighting the increasing sophistication of trap deployments."

		},

		{

			id: 2,

			icon: <FiAlertTriangle className="w-6 h-6 text-white" />,

			title: 'Advanced Threats',

			value: 23.4,

			suffix: 'M',

			meta: '5,800+ cases',

			// Steady upward trend with noise

			data: [5, 6, 5.5, 7, 7.5, 8, 8.5, 10, 11, 10.5, 12, 13, 14, 15],

			color: "#F59E0B",

			speed: 15,

			description: "Total financial impact from cross-chain phishing and sophisticated wallet-draining operations worldwide."

		},

		{

			id: 3,

			icon: <FiZap className="w-6 h-6 text-white" />,

			title: 'Revert Transactions',

			value: 8.2,

			suffix: 'M',

			meta: 'ongoing',

			// Smooth wave-like pattern

			data: [6, 7, 8, 7.5, 6.5, 6, 5.5, 6, 7, 8, 8.5, 8, 7, 6],

			color: "#3B82F6",

			speed: 18,

			description: "Aggregated loss from gas fees on failed and malicious transaction attempts across supported networks."

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

					<div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
						<div className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
						</div>
						<span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-300 uppercase">Security Alert</span>
					</div>



					<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 px-4"><span className="grad-word">Threats</span> at a glance</h3>

					<p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4 font-medium tracking-wide">Key indicators condensed into clear, actionable metrics.</p>

				</motion.div>



				<motion.div variants={container} initial="hidden" animate={isInView ? 'show' : 'hidden'} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

					{stats.map(s => {

						// Ensure the cycle is perfectly seamless by appending the first point to the end

						const seamlessCycle = [...s.data, s.data[0]];



						// Triple the seamless cycle: [Cycle 1, Cycle 2, Cycle 3]

						const tripleData = [...seamlessCycle, ...seamlessCycle, ...seamlessCycle];



						const cycleLen = seamlessCycle.length;

						const totalPoints = tripleData.length;



						// Total width of the path

						const totalWidth = 900;



						// Generate smooth path

						const pathD = generateSmoothPath(tripleData, totalWidth, 30);



						// We want to slide exactly from the start of the 2nd cycle to the start of the 3rd cycle

						// The distance between starts is cycleLen-1 steps.

						// The total distance in the SVG is totalPoints-1 steps.

						const startPointIndex = cycleLen;

						const endPointIndex = cycleLen * 2;



						const startX = -(startPointIndex / (totalPoints - 1)) * 100;

						const endX = -(endPointIndex / (totalPoints - 1)) * 100;



						return (

							<motion.div key={s.id} variants={card}>

								<TiltedCard className="group h-full relative">

									{/* 1. Glow Layer (Behind the card face) */}

									<div className="absolute inset-0 rounded-3xl bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-500 blur-[40px] -z-10 translate-y-4 opacity-0 group-hover:opacity-100 pointer-events-none"></div>



									{/* 2. Card Face */}

									<div className="relative z-10 h-full rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-2xl">

										<div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>



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

											<div className="text-4xl sm:text-5xl font-bold tracking-tighter bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent group-hover:text-white transition-all duration-300 drop-shadow-sm font-mono mt-2">

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

													duration: s.speed

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

													/>

												</svg>

											</motion.div>

										</div>



										<div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors relative z-20 mt-2">{s.description}</div>

									</div>

								</TiltedCard>

							</motion.div>

						)
					})}

				</motion.div>

				<div className="mt-10 sm:mt-12 text-center px-4 relative z-10">
					<a href="/simulate" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm sm:text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md w-full sm:w-auto justify-center group overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
						<span className="relative z-10 font-mono tracking-tight">RUN SCAN →</span>
					</a>
				</div>
			</div>
		</section>
	)
}

export default StatsSection;