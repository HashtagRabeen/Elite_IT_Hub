const inquiryModel = require("../model/inquiryModel");

const createInquiry = async (req, res) => {
  try {
    const { course, name, email, phone, message } = req.body;
    let response = new inquiryModel({
      course,
      name,
      email,
      phone,
      message,
    });
    response = await response.save();
    res.status(201).json({ message: "Inquiry Sent Successfuly", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error });
  }
};

const getInquiry = async (req, res) => {
  try {
    let showInquiry = await inquiryModel.find();
    res
      .status(201)
      .json({ message: "Inquiry found successfully", showInquiry });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting inquiry", error });
  }
};

const deleteInquiry = async (req, res) => {
  try {
    const id = req.params.id;
    let response = await inquiryModel.findByIdAndDelete(id);
    res.status(201).json({ message: "Inquiry deleted successfully", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while deleting inquiry", error });
  }
};

const updateInquiryStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const updatedStatus = await inquiryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: " Status Updated", updatedStatus });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

module.exports = {
  createInquiry,
  getInquiry,
  deleteInquiry,
  updateInquiryStatus,
};
