const { ProductModel } = require("../models/productModel.js");
const {uploadFiles} = require("../config/cloudinary.js")
const fs = require("fs")

const getAllProducts = async (req, res) => {
  const allData = await ProductModel.find();
  res.status(200).json({ message: "all products information", allData });
};

const postProduct = async (req, res) => {
  const { title, image, price, category } = req.body;
  const cloudinaryUploader = await uploadFiles(req.file.path) 
  console.log(cloudinaryUploader)
  fs.unlinkSync(req.file.path)
  const update = await ProductModel.create({ title, image, price, category, image:cloudinaryUploader.url });
  res.status(201).json({
    message: "added successfully",
    update,
  });
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);
  console.log(product);
  res.status(200).send(product);
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    const findProduct = await ProductModel.findOne({ _id: id });
    if (findProduct) {
      const data = await ProductModel.findOneAndUpdate(
        { _id: id },
        {
          price: price,
        },
        { new: true }
      );
      res.status(200).json({ message: "updated successfully", data });
    }
    res.send("updated product");
  } catch (error) {
    console.error(error);
    res.status(400).send("internal server error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    res.status(204).json({ message: "deleted successfully", deleteProduct });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

module.exports = {
  getAllProducts,
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
