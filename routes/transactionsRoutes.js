const { Router } = require("express");
const {
  updateTransactionById,
} = require("../controllers/transactions/transationsUpdateController");

const {
  crearTransaccion,
} = require("../controllers/transactions/crearTransacciones");

const router = Router();

router.post("/transactions", crearTransaccion);
router.put("/transactions/:id", updateTransactionById);

module.exports = router;
