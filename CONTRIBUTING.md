# Contributing to TxShield

First off, thank you for considering contributing to TxShield! It's people like you that make open source such a great community.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](../../issues) to see if someone else in the community has already created a ticket. If not, go ahead and make one!

## Setting up your environment

1. **Fork the repository** to your own GitHub account and clone it to your local machine.
2. **Install dependencies** for both the client and the server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3. **Set up Environment Variables**:
   Copy the example environment files (if available) and fill in your details:
   - For the server, you will need a `.env` file containing your provider keys, Redis configuration, etc.
   - For the client, you will need a `.env` or `.env.local` for your Next.js environment variables.

4. **Run the development servers**:
   In two separate terminal tabs:
   ```bash
   # Terminal 1 - Server
   cd server
   npm start

   # Terminal 2 - Client
   cd client
   npm run dev
   ```

## Pull Request Process

1. **Create a new branch**: `git checkout -b feature/your-feature-name` or `bugfix/issue-number`.
2. **Make your changes**: Write clean, readable code and include comments where necessary.
3. **Test your changes**: Ensure your changes don't break existing functionality and run any existing tests.
4. **Commit your changes**: Write clear, descriptive commit messages.
5. **Push to your fork** and submit a **Pull Request** against the `main` branch.
6. A maintainer will review your code. You might be asked to make some changes before it can be merged.

## Coding Standards

- We use **ESLint** and **Prettier**. Please ensure your code passes linting before submitting a PR.
- Write meaningful variable names and modularize your code.
- Avoid committing any sensitive information like API keys or `.env` files. (Our `.gitignore` should prevent this, but please double-check).

Thank you for contributing!
