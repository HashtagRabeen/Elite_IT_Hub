const { getAllUser, editUser,deleteUser,getSingleUser } = require("../controllers/studentController");

const AuthMid = require("../middlewares/authMid");

const express = require("express");

const router = express.Router();

router.get("/getAllUser", AuthMid, getAllUser);
router.put("/editUser/:id", AuthMid, editUser);
router.delete("/deleteUser/:id",AuthMid,deleteUser);
// router.get("/getAllUser",AuthMid getAllUser);
router.get("/getSingleUser",AuthMid, getSingleUser);

module.exports = router;
