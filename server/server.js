require("module-alias/register");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// middlewares
const authMiddleware = require("./middlewares/auth.middleware");

// all routes path
const simulateRouter = require("./routes/simulation/simulation.routes");
const honeypotRouter = require("./routes/honeypot/honeypot.routes");
const phishingRouter = require("./routes/phishing/phishing.routes");
const contactRouter = require("./routes/contact/contact.routes");
const suggestionRouter = require("./routes/aiModel/aiModel.routes");
const authRouter = require("./routes/auth/auth");
const solSimulateRouter = require("./routes/simulation/sol-simulation.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://txshield.xyz",
  "https://www.txshield.xyz",
  /\.vercel\.app$/, // This Regex allows ANY Vercel preview or production branch
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((allowed) => {
        if (allowed instanceof RegExp) return allowed.test(origin);
        return allowed === origin;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

// Routes (some need auth_middleware)
app.use("/api/simulate", simulateRouter);

app.use("/api/honeypot", honeypotRouter);

app.use("/api/phishing", phishingRouter);

app.use("/api/generations/", suggestionRouter);

app.use("/api/contact/", contactRouter);

app.use("/auth", authRouter);

app.use("/api/solana/simulate", solSimulateRouter);

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
