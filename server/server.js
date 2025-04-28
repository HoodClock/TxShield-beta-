const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// Routes

// Listen Server
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});
