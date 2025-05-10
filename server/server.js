const express = require("express");
const cors = require("cors");
require("dotenv").config();


// all routes path
const simulateRouter = require("./routes/simulation/simulation.routes")
const honeypotRouter = require("./routes/honeypot/honeypot.routes")

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/simulate", simulateRouter)

app.use("/api/honeypot", honeypotRouter);

// Listen Server
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});
