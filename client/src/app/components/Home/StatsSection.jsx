import React, { useRef, useState } from 'react'
import { m, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { FiShield, FiAlertTriangle, FiZap } from 'react-icons/fi'
import TiltedCard from '../TiltedCard'
import ScrambleText from '../ScrambleText';

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
		const p0 = points[i - 1] || points[i]; // clamped for start
		const p1 = points[i];
		const p2 = points[i + 1];
		const p3 = points[i + 2] || p2; // clamped for end

		// Catmull-Rom tension
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
			icon: <FiShield className="w-6 h-6 text-cyan-400" />,
			title: 'Honeypot Scams',
			value: 12.7,
			suffix: 'M',
			meta: '3,200+ cases',
			data: [4, 8, 5, 9, 6, 12, 8, 15, 10, 14, 9, 11, 5, 9],
			color: "#06b6d4", // Cyan-500
			speed: 12,
			description: "Cumulative capital lost to exit-scam contracts globally, highlighting the increasing sophistication of trap deployments."
		},
		{
			id: 2,
			icon: <FiAlertTriangle className="w-6 h-6 text-purple-400" />,
			title: 'Advanced Threats',
			value: 23.4,
			suffix: 'M',
			meta: '5,800+ cases',
			data: [5, 6, 5.5, 7, 7.5, 8, 8.5, 10, 11, 10.5, 12, 13, 14, 15],
			color: "#a855f7", // Purple-500
			speed: 15,
			description: "Total financial impact from cross-chain phishing and sophisticated wallet-draining operations worldwide."
		},
		{
			id: 3,
			icon: <FiZap className="w-6 h-6 text-blue-400" />,
			title: 'Revert Transactions',
			value: 8.2,
			suffix: 'M',
			meta: 'ongoing',
			data: [6, 7, 8, 7.5, 6.5, 6, 5.5, 6, 7, 8, 8.5, 8, 7, 6],
			color: "#3b82f6", // Blue-500
			speed: 18,
			description: "Aggregated loss from gas fees on failed and malicious transaction attempts across supported networks."
		}
	]

	return (
		<section ref={ref} className="relative w-full h-[100dvh] overflow-hidden bg-background flex flex-col justify-center items-center py-4 px-4 sm:px-8 transition-colors duration-700">
			
			<div className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-cyan-900/10 to-transparent rounded-full -translate-y-1/2 -z-10 pointer-events-none mix-blend-screen"></div>
			<div className="absolute top-1/2 right-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-900/10 to-transparent rounded-full -translate-y-1/2 -z-10 pointer-events-none mix-blend-screen"></div>

			<div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16 h-full max-h-[600px]">
				
				{/* Left Column: Headers & CTA */}
				<m.div
					initial={{ opacity: 0, x: -20 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="flex flex-col items-center md:items-start justify-center flex-shrink-0 w-full md:w-1/3"
				>
					<h2 className="text-6xl sm:text-7xl lg:text-8xl font-clash font-extrabold tracking-[0.15em] opacity-90 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] uppercase text-center md:text-left leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
						STATS
					</h2>
					<div className="text-[10px] sm:text-xs font-mono text-cyan-400/80 tracking-[0.3em] uppercase mt-4 mb-8 flex items-center gap-4 whitespace-nowrap">
						<span className="w-8 h-[1px] bg-cyan-500/50 hidden md:block"></span>
						<ScrambleText text="Global Analytics" duration={2500} />
						<span className="w-8 h-[1px] bg-cyan-500/50"></span>
					</div>

					{/* Floating CTA */}
					<a href="/simulate" className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-card border border-border hover:border-primary text-foreground font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group overflow-hidden hover:bg-foreground/5 rounded-none w-full md:w-auto mt-4 md:mt-8">
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
						<span className="w-1.5 h-1.5 bg-cyan-400 group-hover:bg-purple-400 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
						RUN SCAN
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					</a>
				</m.div>

				{/* Right Column: 3D Carousel Container */}
				<div className="relative h-[320px] sm:h-[380px] lg:h-[450px] w-full md:w-2/3 max-w-4xl flex items-center justify-center perspective-[1000px]">
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
								xPos = "-60%";
								zPos = -180;
								scale = 0.8;
								opacity = 0.4;
								zIndex = 20;
								rotateY = 25;
							} else if (isRight) {
								xPos = "60%";
								zPos = -180;
								scale = 0.8;
								opacity = 0.4;
								zIndex = 20;
								rotateY = -25;
							}

							// For the charts - Create a perfect seamless loop
							const cycleData = s.data;
							const numCycles = 5; 
							const repeatedData = Array(numCycles).fill(cycleData).flat();
							const cycleLen = cycleData.length;
							const totalPoints = repeatedData.length;

							const totalWidth = 1500;
							const pathHeight = 30;

							const pathD = generateSmoothPath(repeatedData, totalWidth, pathHeight);
							const fillPathD = `${pathD} L ${totalWidth} ${pathHeight + 20} L 0 ${pathHeight + 20} Z`;

							const startPointIndex = cycleLen * 2;
							const endPointIndex = cycleLen * 3;

							const startX = -(startPointIndex / (totalPoints - 1)) * 100;
							const endX = -(endPointIndex / (totalPoints - 1)) * 100;

							return (
								<m.div
									key={s.id}
									onClick={() => !isActive && setActiveIndex(index)}
									className={`absolute w-full max-w-[280px] sm:max-w-xs lg:max-w-[380px] cursor-pointer ${isActive ? 'cursor-default' : ''}`}
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
									<TiltedCard disabled={!isActive} className={`group h-[300px] lg:h-[360px] relative transition-all duration-300`}>
										{/* Glow Layer (Active only) */}
										<div 
											className={`absolute inset-0 transition-all duration-500 blur-[80px] -z-10 translate-y-4 pointer-events-none ${isActive ? 'opacity-60' : 'opacity-0'}`}
											style={{ backgroundColor: `${s.color}33` }}
										></div>

										{/* Card Face - Cyberpunk Sharp Geometry */}
										<div className={`relative z-10 h-full rounded-none border border-border p-5 lg:p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 ${isActive ? 'bg-card shadow-[0_30px_60px_-12px_rgba(0,0,0,1)]' : 'bg-background'}`}>
											
											{/* Top Accent Line */}
											{isActive && (
												<div 
													className="absolute top-0 left-0 w-full h-[2px] transition-all duration-700"
													style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
												></div>
											)}

											<div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

											<div className="relative z-20 mb-2 lg:mb-4">
												<div className="flex items-center justify-between mb-4">
													<div className="inline-flex items-center gap-3">
														<div className="w-10 h-10 rounded-none bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative shrink-0">
															<div className="absolute inset-0 border border-white/5 opacity-50 m-[2px]"></div>
															<div className="relative z-10">{s.icon}</div>
														</div>
														<div>
															<div className={`text-sm lg:text-base font-medium tracking-wide transition-colors leading-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{s.title}</div>
															<div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-0.5">{s.meta}</div>
														</div>
													</div>
												</div>

												{/* Typed Hierarchy */}
												<div className="flex items-baseline gap-1 mt-1 lg:mt-2">
													<span className="text-xl font-bold text-gray-500 font-mono">$</span>
													<div className={`text-4xl lg:text-5xl font-bold tracking-tighter text-foreground transition-all duration-300 drop-shadow-md font-mono leading-none ${!isActive ? 'opacity-70' : ''}`}>
														<CountUp end={s.value} decimals={1} duration={2.5} />
													</div>
													<span className="text-xl font-bold text-gray-500 ml-1 font-mono">{s.suffix}</span>
												</div>
											</div>

											{/* Scrolling Area Chart */}
											<div className="h-12 sm:h-16 w-full relative z-10 overflow-hidden -mx-2 px-2 -mb-2 pb-2">
												<m.div
													className="h-full flex"
													style={{ width: `${numCycles * 100}%`, filter: `drop-shadow(0px 4px 8px ${s.color}60)` }}
													animate={{ x: [`${startX}%`, `${endX}%`] }}
													transition={{ repeat: Infinity, ease: "linear", duration: s.speed }}
												>
													<svg viewBox={`0 0 ${totalWidth} ${pathHeight + 20}`} preserveAspectRatio="none" className="w-full h-full overflow-visible preserve-3d">
														<defs>
															<linearGradient id={`line-grad-${s.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
																<stop offset="0%" stopColor={s.color} stopOpacity="0" />
																<stop offset="20%" stopColor={s.color} stopOpacity="1" />
																<stop offset="80%" stopColor={s.color} stopOpacity="1" />
																<stop offset="100%" stopColor={s.color} stopOpacity="0" />
															</linearGradient>
															<linearGradient id={`fill-grad-${s.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
																<stop offset="0%" stopColor={s.color} stopOpacity="0.4" />
																<stop offset="100%" stopColor={s.color} stopOpacity="0" />
															</linearGradient>
														</defs>
														<path
															d={fillPathD}
															fill={`url(#fill-grad-${s.id})`}
															className="transition-all duration-500"
															style={{ opacity: isActive ? 1 : 0.3 }}
														/>
														<path
															d={pathD}
															fill="none"
															stroke={`url(#line-grad-${s.id})`}
															strokeWidth="2"
															strokeLinecap="square"
															className="transition-all duration-500"
															style={{ opacity: isActive ? 1 : 0.5 }}
														/>
													</svg>
												</m.div>
											</div>

											<div className={`text-xs mt-3 font-mono tracking-tight leading-relaxed transition-colors relative z-20 ${isActive ? 'text-gray-400' : 'text-gray-600'}`}>
												{s.description}
											</div>
										</div>
									</TiltedCard>
								</m.div>
							)
						})}
					</AnimatePresence>
				</div>
			</div>
		</section>
	)
}

export default StatsSection;