const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: { type: String },
  image: { type: String, require: true },
  category: {
    type: String,
    required: true,
  },
  rating: { type: Number },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
