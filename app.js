// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const transactionController = require("./controllers/transactionsController.js");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/transactions", transactionController);

// ROUTE HANDLERS
const homePageHandler = (req, res) => {
  res.status(200).send("Welcome to the Budgeting App!");
};

const notFoundHandler = (req, res) => {
  res.status(404).send("Page not found");
};

// ROUTES
app.get("/", homePageHandler);
app.get("*", notFoundHandler);

// EXPORT
module.exports = app;
