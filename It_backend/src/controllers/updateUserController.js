const updateModel =require('../model/updateUserModel')

const savedUpdateDetails = async (req, res) => {
  try {
    const { userName, userId ,updatedUserName,courseName} = req.body;
    const savedUpdate = await updateModel.create({
      userName,
      userId,
      updatedUserName
    });
    res.status(201).json({ message: "Update recorded", savedUpdate });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Could not saved updated by details", error: error.message });
  }
};

const getUpdateDetails=async(req,res)=>{
   try{
          const getUpdate=await updateModel.find()
          res.status(201).json({message:"Delete details found successully",getUpdate})
   }
   catch(error){
       console.log(error)
       res
      .status(500)
      .json({ message: "Couldnot found delete details", error: error.message });
   }
}

module.exports={savedUpdateDetails,getUpdateDetails}