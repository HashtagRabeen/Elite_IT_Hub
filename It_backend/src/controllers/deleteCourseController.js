const deleteModel = require("../model/deleteCourseModel");

const savedDeleteDetails = async (req, res) => {
  try {
    const { userName, userId ,courseId,courseName} = req.body;
    const savedDelete = await deleteModel.create({
      userName,
      userId,
      courseId,
      courseName  
    });
    res.status(201).json({ message: "Deletion recorded", savedDelete });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Could not save deletedBy", error: error.message });
  }
};

const getDeleteDetails=async(req,res)=>{
   try{
          const getDelete=await deleteModel.find()
          res.status(201).json({message:"Delete details found successully",getDelete})
   }
   catch(error){
       console.log(error)
       res
      .status(500)
      .json({ message: "Couldnot found delete details", error: error.message });
   }
}
module.exports={savedDeleteDetails,getDeleteDetails}
