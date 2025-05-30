export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-shield-alt text-white text-lg"></i>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              TxShield
            </h2>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-lg">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-lg">
              <i className="fab fa-discord"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-lg">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-lg">
              <i className="fab fa-medium"></i>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center space-x-1">
            <i className="fas fa-exclamation-triangle text-yellow-500 mr-1"></i>
            © 2025 TxShield. All rights reserved. Use at your own risk.
          </p>
          <p className="mt-2 flex items-center justify-center">
            <i className="fas fa-info-circle text-blue-400 mr-1"></i>
            This is a simulation tool and does not guarantee transaction success.
          </p>
        </div>
      </div>
    </footer>
  )
}