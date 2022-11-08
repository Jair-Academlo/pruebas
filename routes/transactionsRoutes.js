const express = require("express");

const router = express.Router();
const {
  createTransaction,
} = require("../controllers/Transactions/transactionCreateController");
const {
  listTransactions,
} = require("../controllers/Transactions/transactionSearchController");
const {
  getTransactionById,
} = require("../controllers/Transactions/transactionsSearchOneController");

const {
  updateTransactionById,
} = require("../controllers/Transactions/transationsUpdateController");
const {
  deleteTransaction,
} = require("../controllers/Transactions/transactionsDeleteControllers");

router.put("//transactions/:id", updateTransactionById);
router.post("/transactions", createTransaction);
router.get("/transactions", listTransactions);
router.get("/transactions/:id", getTransactionById);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;
