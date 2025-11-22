import React, { useRef } from 'react'
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { FiShield, FiAlertTriangle, FiZap } from 'react-icons/fi'
import TiltedCard from '../TiltedCard'

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
			meta: '3,200+ cases'
		},
		{
			id: 2,
			icon: <FiAlertTriangle className="w-6 h-6 text-white" />,
			title: 'Advanced Threats',
			value: 23.4,
			suffix: 'M',
			meta: '5,800+ cases'
		},
		{
			id: 3,
			icon: <FiZap className="w-6 h-6 text-white" />,
			title: 'Revert Transactions',
			value: 8.2,
			suffix: 'M',
			meta: 'ongoing'
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
					{stats.map(s => (
						<motion.div key={s.id} variants={card}>
							<TiltedCard className="group rounded-xl bg-white/4 border border-white/6 p-6 backdrop-blur-sm flex flex-col gap-4 h-full hover:border-cyan-400/30 transition-all duration-300">
								<div className="flex items-center justify-between">
									<div className="inline-flex items-center gap-3">
										<div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center">
											{s.icon}
										</div>
										<div>
											<div className="text-sm text-gray-400">{s.title}</div>
											<div className="text-xs text-gray-500">{s.meta}</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-2xl font-bold text-white">
											$<CountUp end={s.value} decimals={1} duration={1.8} />{s.suffix}
										</div>
									</div>
								</div>

								<div className="text-sm text-gray-400">Concise context copy that explains the metric and why it matters — short and unobtrusive.</div>
							</TiltedCard>
						</motion.div>
					))}
				</motion.div>

				<div className="mt-6 sm:mt-8 text-center px-4">
					<a href="/simulate" className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-md bg-white text-black font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition w-full sm:w-auto justify-center">Run a quick scan</a>
				</div>
			</div>
		</section>
	)
}

export default StatsSection;
