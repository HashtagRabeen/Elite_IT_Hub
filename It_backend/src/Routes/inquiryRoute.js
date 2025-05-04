const {createInquiry,getInquiry,deleteInquiry,updateInquiryStatus}=require("../controllers/inquiryController")

const express=require("express");

const router=express.Router();

router.post("/createInquiry",createInquiry);
router.get("/getInquiry",getInquiry);
router.delete("/deleteInquiry/:id",deleteInquiry);
router.put("/updateInquiryStatus/:id",updateInquiryStatus);

module.exports=router;