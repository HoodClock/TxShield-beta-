"use client";

export default function ActionButtons({ isVisible, onSimulateAgain }) {
  if (!isVisible) return null;

  const handleProceed = () => {
    alert("Transaction submitted!");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
      {/* Proceed Button */}
      <button
        onClick={handleProceed}
        className="px-8 py-3.5 bg-gradient-to-r from-primary-400 to-secondary-500 hover:from-primary-500 hover:to-secondary-600 text-white font-semibold rounded-xl shadow-md hover:shadow-primary-400/30 transition-all duration-300 flex items-center justify-center group"
      >
        <i className="fas fa-paper-plane mr-3 transition-transform group-hover:translate-x-1"></i>
        <span className="tracking-wide">Proceed with Transaction</span>
        <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
          87% Safe
        </span>
      </button>

      {/* Simulate Again Button */}
      <button
        onClick={onSimulateAgain}
        className="px-8 py-3.5 bg-black border border-primary-400 hover:bg-primary-900 text-primary-300 font-medium rounded-xl transition-all duration-300 flex items-center justify-center group"
      >
        <i className="fas fa-redo mr-3 transition-transform group-hover:rotate-180"></i>
        <span>Simulate Again</span>
      </button>

      {/* Security Check Label */}
      <div className="w-full md:w-auto flex items-center justify-center mt-2 md:mt-0">
        <div className="flex items-center text-sm text-primary-300">
          <i className="fas fa-shield-alt mr-2 text-secondary-400"></i>
          <span>TxShield Security Check</span>
        </div>
      </div>
    </div>
  );
}
