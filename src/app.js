const express = require("express");
const cors = require("cors");
require("dotenv").config();

const masterRoutes = require("./routes/masterRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/masters", masterRoutes);
app.use("/api/employees", employeeRoutes);

module.exports = app;
