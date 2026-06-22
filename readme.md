# TxShield

TxShield is an EVM transaction simulation and analysis platform. It helps users preview and simulate Ethereum (and other EVM-compatible) transactions before broadcasting them to the network, estimating gas costs, token transfers, and potential warnings (like insufficient funds or transfers to zero addresses).

## Features
- **EVM Transaction Simulation:** Preview transactions securely.
- **Gas Estimation:** Real-time gas cost estimation in ETH and USD.
- **Token Transfer Support:** Simulates both native ETH and ERC-20 token transfers.
- **Phishing & Honeypot Detection:** AI and heuristic-based risk analysis for smart contracts.
- **Caching:** Redis-powered caching for rapid simulation responses.

## Tech Stack
- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database / Cache:** SQLite, Redis
- **Blockchain:** Ethers.js, Alchemy API

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Redis (running locally or via a cloud provider)
- An RPC Provider API Key (e.g., Alchemy or Infura)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourOrg/TxShield.git
   cd TxShield
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

You need to set up your environment variables. Never commit these files to version control!

1. **Server `.env`:**
   Create a `.env` file in the `/server` directory and add the following keys (adjust as needed for your specific setup):
   ```env
   PORT=5000
   PROVIDER_API_KEY=your_alchemy_or_infura_key
   REDIS_URL=redis://localhost:6379
   EXPIRY_SECONDS=3600
   ```

2. **Client `.env`:**
   Create a `.env.local` file in the `/client` directory with your Next.js public variables.

### Running Locally

You will need two terminal windows to run both the frontend and the backend simultaneously.

**Terminal 1: Start the Server**
```bash
cd server
npm run dev
# The server usually runs on http://localhost:5000
```

**Terminal 2: Start the Client**
```bash
cd client
npm run dev
# The client will run on http://localhost:3000
```

## Contributing

We welcome contributions from the community! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get started, set up your environment, and submit Pull Requests.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

