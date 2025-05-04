const {
  createUser,
  login,
  getAllUser,
  getSingleUser,
} = require("../controllers/authController");
const express = require("express");

const router = express.Router();
router.post("/login", login);
router.post("/createUser",createUser);


module.exports = router;
