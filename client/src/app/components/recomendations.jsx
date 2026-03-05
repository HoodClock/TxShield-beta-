import { useState } from "react";
import { Sparkles, Bot } from "lucide-react";
import { m } from "framer-motion";

export default function Recommendations({
  onGenerate,
  recommendation,
  chain = "EVM"
}) {
  const [generated, setGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Theme Colors
  const theme = chain === "EVM" ? {
    primary: "blue",
    secondary: "cyan",
    accent: "sky",
    gradientFrom: "from-blue-600/40",
    gradientTo: "to-cyan-600/40",
    textGradient: "bg-gradient-to-r from-blue-400 to-cyan-400",
    buttonGradient: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400",
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-400",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-400/30",
    hoverShadow: "hover:shadow-blue-500/20",
    loadingIcon: "text-blue-300",
    loadingDot: "bg-blue-400",
    loadingCircle: "bg-gradient-to-br from-blue-500 to-cyan-400 shadow-blue-500/30",
    loadingRing: "border-blue-400/30",
    bgGlow1: "bg-blue-600",
    bgGlow2: "bg-cyan-600"
  } : {
    primary: "purple",
    secondary: "pink",
    accent: "fuchsia",
    gradientFrom: "from-purple-600/40",
    gradientTo: "to-pink-600/40",
    textGradient: "bg-gradient-to-r from-purple-400 to-pink-400",
    buttonGradient: "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400",
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-400/30",
    hoverShadow: "hover:shadow-purple-500/20",
    loadingIcon: "text-purple-300",
    loadingDot: "bg-purple-400",
    loadingCircle: "bg-gradient-to-br from-purple-500 to-pink-400 shadow-purple-500/30",
    loadingRing: "border-purple-400/30",
    bgGlow1: "bg-purple-600",
    bgGlow2: "bg-pink-600"
  };

  const gradientBorderCard = `
    p-[1px] rounded-2xl
    bg-gradient-to-br ${theme.gradientFrom} via-${theme.secondary}-500/30 ${theme.gradientTo}
  `;

  const innerContent = `
    rounded-2xl bg-black 
    border border-white/5 backdrop-blur-sm
    ${theme.hoverBorder} hover:shadow-xl ${theme.hoverShadow}
    transition-all duration-300
  `;

  const handleClick = async () => {
    setIsLoading(true);
    await onGenerate();
    setGenerated(true);
    setIsLoading(false);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={gradientBorderCard}
    >
      <div className={innerContent + " p-8 relative overflow-hidden"}>
        {/* Glowing background elements */}
        <div className={`absolute top-[-30%] right-[-30%] w-96 h-96 ${theme.bgGlow1} opacity-10 rounded-full blur-3xl pointer-events-none animate-pulse`} />
        <div className={`absolute bottom-[-20%] left-[-20%] w-64 h-64 ${theme.bgGlow2} opacity-5 rounded-full blur-2xl pointer-events-none`} />

        <div className="flex items-center gap-4 mb-6 relative z-10">
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`${theme.iconBg} p-3 rounded-full shadow-inner`}
          >
            <Sparkles className={`${theme.iconColor} w-6 h-6 drop-shadow-glow`} />
          </m.div>
          <h3 className={`text-3xl font-semibold tracking-wide ${theme.textGradient} text-transparent bg-clip-text drop-shadow-md`}>
            AI Security Insights
          </h3>
        </div>

        {!generated ? (
          <div className="text-center relative z-10">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleClick}
              disabled={isLoading}
              className={`${theme.buttonGradient} transition duration-300 text-white font-semibold py-3 px-8 rounded-full shadow-lg ${
                isLoading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-pulse">Analyzing</span>
                  <span className="loading-dots">
                    <span className="dot animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                    <span className="dot animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="dot animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                  </span>
                </span>
              ) : (
                "Generate Recommendations"
              )}
            </m.button>
          </div>
        ) : (
          <div className="space-y-4 mt-6 relative z-10">
            {recommendation ? (
              recommendation
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, idx) => (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-5 h-5 mt-1 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold group-hover:bg-green-500/30 transition-colors">
                      ✓
                    </div>
                    <p className="text-gray-300 leading-relaxed text-base group-hover:text-gray-100 transition-colors">
                      {line}
                    </p>
                  </m.div>
                ))
            ) : (
              <m.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <Bot className="w-12 h-12 text-yellow-400 mb-4 opacity-80" />
                <p className="text-yellow-400 font-medium text-center">
                  No recommendations available. Try generating again.
                </p>
              </m.div>
            )}
          </div>
        )}

        {/* AI Loading animation */}
        {isLoading && (
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center"
          >
            <div className="relative">
              <div className={`w-24 h-24 rounded-full ${theme.loadingCircle} flex items-center justify-center shadow-lg animate-pulse-slow`}>
                <Bot className="w-10 h-10 text-white" />
              </div>
              <div className={`absolute -inset-2 border-4 ${theme.loadingRing} rounded-full animate-spin-slow pointer-events-none`}></div>
            </div>
            <m.p 
              className={`mt-6 ${theme.loadingIcon} font-medium tracking-wide`}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Analyzing your security data...
            </m.p>
            <div className="mt-4 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <m.div
                  key={i}
                  className={`w-2 h-2 ${theme.loadingDot} rounded-full`}
                    animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </m.div>
        )}
      </div>
    </m.div>
  );
}