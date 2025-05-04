const successModel = require("../model/successModel");

const createSuccess = async (req, res) => {
  try {
    const newSuccess = new successModel({
      name: req.body.name,
      position: req.body.position,
      workAt: req.body.workAt,
      college: req.body.college,
      faculty: req.body.faculty,
      image: req.file.filename,
    });
    const savedSuccess = await newSuccess.save();
    console.log(savedSuccess);
    res.status(201).json({ message: "sucess saved successfully" });
  } catch (err) {
    console.log(err);
  }
};

const getSuccess = async (req, res) => {
  try {
    let showSucess = await successModel.find();
    res.status(200).json({ message: "success found successfully", showSucess });
  } catch (err) {
    console.log("Error found while getting success", err);
    res.status(500).json("server error", err);
  }
};

const deleteSuccess = async (req, res) => {
  try {
    const id = req.params.id;
    let deleteSuc = await successModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Success deleted successfully", deleteSuc });
  } catch (error) {
    console.log(error);
    res.status(500).json("server error", error);
  }
};

module.exports = { createSuccess, getSuccess, deleteSuccess };
