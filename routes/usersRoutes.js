const { Router } = require("express");
const { updateUser } = require("../controllers/Users/userUpdateControllers");
const { getById } = require("../controllers/Users/userByIdcontrollers");
const { getAllUsers } = require('../controllers/Users/userSearchController')


const router = Router();

router.get("/users/:id", getById);
router.put("/users/:id", updateUser);
//Route used for get all users from de Db
router.get('/users', getAllUsers)

module.exports = router;