const { Router } = require("express");
const { updateUser } = require("../controllers/Users/userUpdateControllers");
const { getById } = require("../controllers/Users/userByIdcontrollers");
const { deleteUser } = require("../controllers/Users/userDeleteControllers");
const { getAllUsers } = require("../controllers/Users/userSearchController");
const { crearUser } = require("../controllers/Users/userCreate");

const {
  protectSession,
  protectAccount,
} = require("../middlewares/userMiddleware");
const { userExist } = require("../middlewares/userExists");
const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getById);
router.post("/users", crearUser);
router.put("/users/:id", userExist, protectSession, protectAccount, updateUser);
router.delete("/users/:id", protectSession, protectAccount, deleteUser);

module.exports = router;
