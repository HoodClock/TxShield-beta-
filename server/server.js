const express = require("express");
const cors = require("cors");
require("dotenv").config();

// middlewares
const authMiddleware = require("./middlewares/auth.middleware")

// all routes path
const simulateRouter = require("./routes/simulation/simulation.routes");
const honeypotRouter = require("./routes/honeypot/honeypot.routes");
const phishingRouter = require("./routes/phishing/phishing.routes");
const contactRouter = require("./routes/contact/contact.routes");
const suggestionRouter = require("./routes/aiModel/aiModel.routes");
const authRouter = require("./routes/auth/auth");
const solSimulateRouter = require("./routes/simulation/sol-simulation.routes")

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000", // for local 
      "https://tx-shield-beta.vercel.app", // for testing vps
      "https://txshield.xyz", // for prod
      "https://www.txshield.xyz"], // for prod
    credentials: true,
  })
);
app.use(express.json());

// Routes (some need auth_middleware)
app.use("/api/simulate", simulateRouter);

app.use("/api/honeypot", honeypotRouter);

app.use("/api/phishing", phishingRouter);

app.use("/api/generations/", suggestionRouter);

app.use("/api/contact/", contactRouter);

app.use("/auth", authRouter);

app.use("/api/solana/", solSimulateRouter);

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
