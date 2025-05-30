export default function FeaturesSection() {
  const features = [
    {
      icon: "fa-search-dollar",
      title: "Transaction Simulation",
      description: "Test your transaction in a sandbox environment before executing on-chain. See exactly what will happen without spending gas.",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "fa-shield-alt",
      title: "Honeypot Detection",
      description: "Our 8-point security check identifies common and advanced honeypot schemes to protect your assets.",
      color: "blue",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: "fa-chart-pie",
      title: "Risk Analysis",
      description: "Comprehensive risk assessment with clear visualizations to help you make informed decisions about your transactions.",
      color: "green",
      gradient: "from-emerald-500 to-teal-400",
    },
  ]

  return (
    <section className="max-w-6xl mx-auto mb-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Advanced Security Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800/80 border border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-2 hover:shadow-purple-500/10"
          >
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-5`}>
              <i className={`fas ${feature.icon} text-2xl text-white`}></i>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
            <p className="text-gray-300 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-400 text-sm">
        <p className="inline-flex items-center">
          <i className="fas fa-lock mr-2 text-purple-400"></i>
          All security checks powered by TxShield's proprietary detection algorithms
        </p>
      </div>
    </section>
  )
}