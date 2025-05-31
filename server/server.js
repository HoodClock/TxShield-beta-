const express = require("express");
const cors = require("cors");
require("dotenv").config();

// all routes path
const simulateRouter = require("./routes/simulation/simulation.routes");
const honeypotRouter = require("./routes/honeypot/honeypot.routes");
const phishingRouter = require("./routes/phishing/phishing.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/simulate", simulateRouter);

app.use("/api/honeypot", honeypotRouter);

app.use("/api/phishing", phishingRouter);

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
