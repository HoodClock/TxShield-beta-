"use client";

export default function ActionButtons({ isVisible, onSimulateAgain }) {
  if (!isVisible) return null;

  const handleProceed = () => {
    alert("Transaction submitted!");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
      <button
        onClick={handleProceed}
        className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center group"
      >
        <i className="fas fa-paper-plane mr-3 transition-transform group-hover:translate-x-1"></i>
        <span className="tracking-wide">Proceed with Transaction</span>
        <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">87% Safe</span>
      </button>
      
      <button
        onClick={onSimulateAgain}
        className="px-8 py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-xl border border-gray-600 hover:border-gray-400 transition-all duration-300 flex items-center justify-center group"
      >
        <i className="fas fa-redo mr-3 transition-transform group-hover:rotate-180"></i>
        <span>Simulate Again</span>
      </button>

      <div className="w-full md:w-auto flex items-center justify-center mt-2 md:mt-0">
        <div className="flex items-center text-sm text-gray-400">
          <i className="fas fa-shield-alt mr-2 text-purple-400"></i>
          <span>TxShield Security Check</span>
        </div>
      </div>
    </div>
  );
}