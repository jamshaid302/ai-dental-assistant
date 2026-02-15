const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
const { apiRoutes } = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", apiRoutes);

// Error handler
app.use(errorMiddleware);

module.exports = app;
