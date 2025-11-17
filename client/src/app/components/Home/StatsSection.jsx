import React, { useRef } from 'react'
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { FiShield, FiAlertTriangle, FiZap } from 'react-icons/fi'

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
		<section ref={ref} className="relative py-12 px-4 sm:px-6">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center mb-10"
				>
					<div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/6 mb-4">
						<div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
						<span className="text-sm text-gray-300 uppercase">Security Alert</span>
					</div>

					<h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">Threats at a glance</h3>
					<p className="text-gray-400 max-w-2xl mx-auto">Key indicators condensed into clear, actionable metrics.</p>
				</motion.div>

				<motion.div variants={container} initial="hidden" animate={isInView ? 'show' : 'hidden'} className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{stats.map(s => (
						<motion.div key={s.id} variants={card} className="rounded-xl bg-white/4 border border-white/6 p-6 backdrop-blur-sm flex flex-col gap-4">
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
						</motion.div>
					))}
				</motion.div>

				<div className="mt-8 text-center">
					<a href="/simulate" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white text-black font-medium shadow-sm hover:shadow-md transition">Run a quick scan</a>
				</div>
			</div>
		</section>
	)
}

export default StatsSection;
