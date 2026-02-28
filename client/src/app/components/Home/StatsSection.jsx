import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from "framer-motion";
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
	const [activeIndex, setActiveIndex] = useState(1);

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

		<section ref={ref} className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/50 border border-white/10 mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
						<div className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]"></span>
						</div>
						<span className="text-sm font-semibold tracking-wider text-gray-300 uppercase">Security Alert</span>
					</div>

					<h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3 px-4"><span className="grad-word">Threats</span> at a glance</h3>
					<p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl px-4 font-medium tracking-wide">Key indicators condensed into clear, actionable metrics.</p>
				</motion.div>



				{/* 3D Carousel Container */}
				<div className="relative h-[480px] sm:h-[450px] w-full max-w-4xl mx-auto flex items-center justify-center perspective-[1200px]">
					<AnimatePresence>
						{stats.map((s, index) => {
							const isActive = activeIndex === index;
							const isLeft = index === (activeIndex - 1 + stats.length) % stats.length;
							const isRight = index === (activeIndex + 1) % stats.length;

							// Determine positions and z-indexes
							let xPos = 0;
							let zPos = 0;
							let scale = 1;
							let opacity = 1;
							let zIndex = 0;
							let rotateY = 0;

							if (isActive) {
								xPos = 0;
								zPos = 0;
								scale = 1;
								opacity = 1;
								zIndex = 30;
								rotateY = 0;
							} else if (isLeft) {
								xPos = "-85%";
								zPos = -250;
								scale = 0.8;
								opacity = 0.3;
								zIndex = 20;
								rotateY = 20;
							} else if (isRight) {
								xPos = "85%";
								zPos = -250;
								scale = 0.8;
								opacity = 0.3;
								zIndex = 20;
								rotateY = -20;
							}

							// For the charts - Create a perfect seamless loop
							const cycleData = s.data;
							const numCycles = 5; // Use 5 cycles to guarantee enough context on both sides
							const repeatedData = Array(numCycles).fill(cycleData).flat();
							const cycleLen = cycleData.length;
							const totalPoints = repeatedData.length;

							const totalWidth = 2000;
							const pathHeight = 40;

							const pathD = generateSmoothPath(repeatedData, totalWidth, pathHeight);
							// Create a closed polygon for the filled area underneath the line
							const fillPathD = `${pathD} L ${totalWidth} ${pathHeight + 20} L 0 ${pathHeight + 20} Z`;

							// Translate from Cycle 2 to Cycle 3 so we have buffer rendering on both edges
							const startPointIndex = cycleLen * 2;
							const endPointIndex = cycleLen * 3;

							// X translations scale automatically because we translate based on % of the element's total simulated width
							const startX = -(startPointIndex / (totalPoints - 1)) * 100;
							const endX = -(endPointIndex / (totalPoints - 1)) * 100;

							return (
								<motion.div
									key={s.id}
									onClick={() => !isActive && setActiveIndex(index)}
									className={`absolute w-full max-w-sm sm:max-w-md cursor-pointer ${isActive ? 'cursor-default' : ''}`}
									initial={false}
									animate={{
										x: xPos,
										z: zPos,
										scale: scale,
										opacity: opacity,
										zIndex: zIndex,
										rotateY: rotateY
									}}
									transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
									style={{ transformStyle: 'preserve-3d', WebkitFontSmoothing: 'antialiased' }}
								>
									<TiltedCard disabled={!isActive} className={`group h-[420px] relative transition-all duration-300`}>
										{/* Glow Layer (Active only) */}
										<div className={`absolute inset-0 rounded-[2rem] bg-${s.color.split('#')[1]}/20 transition-all duration-500 blur-[80px] -z-10 translate-y-4 pointer-events-none ${isActive ? 'opacity-60' : 'opacity-0'}`}></div>

										{/* Card Face */}
										<div className={`relative z-10 h-full rounded-[2rem] border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 ${isActive ? 'bg-[#0a0a0a] shadow-[0_30px_60px_-12px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.1)]' : 'bg-black/80'}`}>
											<div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

											<div className="relative z-20 mb-6">
												<div className="flex items-center justify-between mb-6">
													<div className="inline-flex items-center gap-4">
														<div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative shadow-inner">
															<div className="relative z-10">{s.icon}</div>
														</div>
														<div>
															<div className={`text-base font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>{s.title}</div>
															<div className="text-xs text-gray-500 font-mono tracking-widest uppercase">{s.meta}</div>
														</div>
													</div>
												</div>

												{/* Typed Hierarchy */}
												<div className="flex items-baseline gap-1 mt-2">
													<span className="text-2xl font-bold text-gray-500">$</span>
													<div className={`text-5xl sm:text-6xl font-bold tracking-tighter text-white transition-all duration-300 drop-shadow-md font-mono leading-none ${!isActive ? 'opacity-70' : ''}`}>
														<CountUp end={s.value} decimals={1} duration={2.5} />
													</div>
													<span className="text-2xl font-bold text-gray-500 ml-1">{s.suffix}</span>
												</div>
											</div>

											{/* Scrolling Area Chart */}
											<div className="h-20 w-full relative z-10 overflow-hidden rounded-b-xl -mx-2 px-2 -mb-2 pb-2">
												<motion.div
													className="h-full flex"
													style={{ width: `${numCycles * 100}%`, filter: `drop-shadow(0px 4px 8px ${s.color}60)` }}
													animate={{ x: [`${startX}%`, `${endX}%`] }}
													transition={{ repeat: Infinity, ease: "linear", duration: s.speed }}
												>
													<svg viewBox={`0 0 ${totalWidth} ${pathHeight + 20}`} preserveAspectRatio="none" className="w-full h-full overflow-visible preserve-3d">
														<defs>
															{/* Stroke Gradient */}
															<linearGradient id={`line-grad-${s.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
																<stop offset="0%" stopColor={s.color} stopOpacity="0" />
																<stop offset="20%" stopColor={s.color} stopOpacity="1" />
																<stop offset="80%" stopColor={s.color} stopOpacity="1" />
																<stop offset="100%" stopColor={s.color} stopOpacity="0" />
															</linearGradient>
															{/* Fill Gradient for Area */}
															<linearGradient id={`fill-grad-${s.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
																<stop offset="0%" stopColor={s.color} stopOpacity="0.4" />
																<stop offset="100%" stopColor={s.color} stopOpacity="0" />
															</linearGradient>
														</defs>
														{/* Body Area Fill */}
														<path
															d={fillPathD}
															fill={`url(#fill-grad-${s.id})`}
															className="transition-all duration-500"
															style={{ opacity: isActive ? 1 : 0.3 }}
														/>
														{/* Glowing Top Line */}
														<path
															d={pathD}
															fill="none"
															stroke={`url(#line-grad-${s.id})`}
															strokeWidth="3"
															strokeLinecap="round"
															className="transition-all duration-500"
															style={{ opacity: isActive ? 1 : 0.5 }}
														/>
													</svg>
												</motion.div>
											</div>

											<div className={`text-sm mt-4 font-medium leading-relaxed transition-colors relative z-20 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
												{s.description}
											</div>
										</div>
									</TiltedCard>
								</motion.div>
							)
						})}
					</AnimatePresence>
				</div>

				{/* Floating CTA */}
				<div className="mt-16 text-center px-4 relative z-10 flex justify-center">
					<a href="/simulate" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white/5 border border-purple-500/20 hover:border-purple-500/60 text-white font-semibold text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_30px_-10px_rgba(168,85,247,0.3)] hover:bg-white/10 transition-all duration-300 backdrop-blur-md group overflow-hidden glitch-hover">
						<span className="relative z-10 tracking-widest font-bold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-2">
							RUN SCAN
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						</span>
					</a>
				</div>
			</div>
		</section>
	)
}

export default StatsSection;