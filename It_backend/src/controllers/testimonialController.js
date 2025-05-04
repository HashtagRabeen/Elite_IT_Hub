const testimonialModel = require("../model/testimonialModel");

const createTestimonial = async (req, res) => {
  try {
    const newTest = new testimonialModel({
      name: req.body.name,
      image: req.file.filename,
      message: req.body.message,
      course: req.body.course,
    });
    const savedTestimonial = await newTest.save();
    console.log(savedTestimonial);
    res.status(201).json({ message: "testimonial saved successfully" });
  } catch (err) {
    console.log("Error while creating testimonial:", err);
    res.status(500).send("Server Error ", err);
  }
};

const getTestimonial = async (req, res) => {
  try {
    const showTesti = await testimonialModel.find();
    res
      .status(200)
      .json({ message: "testimonial found successfully", showTesti });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const id = req.params.id;
    let deleteTesti = await testimonialModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "Testimonial deleted successfully", deleteTesti });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};

module.exports={createTestimonial,getTestimonial,deleteTestimonial}
