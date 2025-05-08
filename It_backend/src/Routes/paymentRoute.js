const {createPayment,getPayment}=require("../controllers/paymentController")

const express=require("express");

const router=express.Router();

const AuthMid=require("../middlewares/authMid")

router.post("/createPayment",AuthMid,createPayment);
router.get("/getPayment",AuthMid,getPayment);

module.exports=router;