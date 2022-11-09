const express = require("express");
const { login } = require("../controllers/auth/prueba");

const router = express.Router();

router.post("/auth/login", login);

module.exports = router;
