export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">TxShield</h3>
          <p className="text-gray-400">
            Protecting your crypto transactions from scams and malicious
            contracts.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="footer-link transition">
                Home
              </a>
            </li>
            <li>
              <a href="/simulate" className="footer-link transition">
                Simulate
              </a>
            </li>
            <li>
              <a href="/about" className="footer-link transition">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="footer-link transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="footer-link transition">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="footer-link transition">
                API
              </a>
            </li>
            <li>
              <a href="#" className="footer-link transition">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="footer-link transition">
              Twitter
            </a>
            <a href="#" className="footer-link transition">
              Discord
            </a>
            <a href="#" className="footer-link transition">
              Telegram
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#222] text-center text-gray-500">
        <p>© {new Date().getFullYear()} TxShield. All rights reserved.</p>
      </div>
    </footer>
  );
}
