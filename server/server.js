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

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "https://tx-shield-beta.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/simulate", authMiddleware, simulateRouter);

app.use("/api/honeypot", authMiddleware, honeypotRouter);

app.use("/api/phishing", authMiddleware, phishingRouter);

app.use("/api/contact/", contactRouter);

app.use("/api/generations/", authMiddleware, suggestionRouter);

app.use("/auth", authRouter);

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
