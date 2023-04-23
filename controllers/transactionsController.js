// DEPENDENCIES
const express = require("express");
const transactionData = require("../models/transactions.js");
const transactions = express.Router();

// GET: ROUTE HANDLERS
const homePageHandler = (req, res) => {
  res.status(200).json(transactionData);
};

const transactionIndexHandler = (req, res) => {
  const { index } = req.params;

  if (transactionData[index]) {
    res.status(200).send(transactionData[index]);
  } else {
    res.status(404).send("Transaction not found");
  }
};

// POST: ROUTE HANDLER
const createTransactionHandler = (req, res) => {
  const transaction = req.body;
  const transactionID = transaction.id;

  const transactionExists = transactionData.some((transaction) => transactionID === transaction.id);

  if (transactionExists) {
    return res.status(400).send("Transaction already exists");
  }

  transactionData.push(transaction);
  res.status(200).json(transactionData[transactionData.length - 1]);
};

// PUT: ROUTE HANDLERS
const updateTransactionHandler = (req, res) => {
  const { index } = req.params;
  const updatedTransaction = req.body;

  if (transactionData[index]) {
    transactionData[index] = updatedTransaction;
    res.status(200).send(transactionData[index]);
  } else {
    res.status(404).send("/error");
  }
};

// DELETE: ROUTE HANDLER
const deleteTransactionHandler = (req, res) => {
  const { index } = req.params;
  transactionData.splice(index, 1);
  res.status(200).send(transactionData);
};

// ROUTES

// GET: ROUTES
transactions.get("/", homePageHandler);
transactions.get("/:index", transactionIndexHandler);

// POST: ROUTE
transactions.post("/", createTransactionHandler);

// PUT: ROUTE
transactions.put("/:index", updateTransactionHandler);

// DELETE: ROUTE
transactions.delete("/:index", deleteTransactionHandler);

// EXPORTS
module.exports = transactions;
