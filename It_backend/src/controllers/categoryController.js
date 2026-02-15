const categoryModel = require("../model/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { category,isActive } = req.body;
    const newCategory = new categoryModel({
      category,isActive
    });
    const savedCategory = await newCategory.save();
    console.log(savedCategory);
    res.status(201).json({ message: "Category saved successfully" });
  } catch (e) {
    console.log("Category error ", error);
  }
};

const getCategory = async (req, res) => {
  try {
    const showCategory = await categoryModel.find();
    res.status(200).json({ message: "course found successfully", showCategory });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json("server error", error);
  }
};

module.exports={createCategory,getCategory}
