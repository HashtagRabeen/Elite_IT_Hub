const {createEnrollment,updateEnrollmentStatus,deleteEnrollment,getEnrollment}=require("../controllers/enrollmentController");

const express=require("express");
const router=express.Router();

const AuthMid=require("../middlewares/authMid")

router.post("/createEnrollment/:id",AuthMid,createEnrollment);
router.put("/updateEnrollmentStatus/:id",updateEnrollmentStatus);
router.delete("/deleteEnrollment/:id",deleteEnrollment);
router.get("/getEnrollment",getEnrollment);

module.exports=router;