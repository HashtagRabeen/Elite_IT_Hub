const {uploadAssignment,editAssignment,deleteAssignment,getAssignment,getAssignmentById}=require("../controllers/assignmentController");
const express=require("express");
const router=express.Router();
const assignment=require("../multer/assignmentMulter");
const assignmentMulter = require("../multer/assignmentMulter");
router.post("/uploadAssignment",assignmentMulter.single("file"),uploadAssignment);
router.get("/getAssignment",getAssignment);
router.get("/getAssignmentById/:id",getAssignmentById);
router.delete("/deleteAssignment/:id",deleteAssignment);
router.put("/editAssignment/:id",editAssignment);

module.exports=router;