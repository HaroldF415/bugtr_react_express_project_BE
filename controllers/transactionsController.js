// DEPENDENCIES
const express = require("express");
const transactionData = require("../models/transactions.js");
const transactions = express.Router();

// GET: ROUTE HANDLERS
const homePageHandler = (req, res) => {
  res.status(200).send(transactionData);
};

const transactionIndexHandler = (req, res) => {
  const { index } = req.params;

  if (transactionData[index]) {
    res.status(200).send(transactionData[index]);
  } else {
    res.status(404).send("/error");
  }
};

// POST: ROUTE HANDLER
const createTransactionHandler = (req, res) => {
  const transaction = req.body;

  transactionData.push(transaction);
  // res.status(200).send(transaction);
  res.status(200).send(transactionData[transactionData.length - 1]);
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
