const { ProductModel } = require("../models/productModel.js");
const { CartModel } = require("../models/cartModel.js");
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const checkProduct = await ProductModel.findOne({ _id: productId });
    if (checkProduct) {
      const checkInCart = await CartModel.findOne({ productId: productId, userId:req.user._id });
      if (checkInCart) {
        console.log(req.user)
        const updateCart = await CartModel.updateOne(
          { productId: productId, userId: req.user._id },
          {
            quantity: checkInCart.quantity + 1,
            price: (checkInCart.quantity + 1) * checkProduct.price,
          },
          { new: true }
        );
        const data = await CartModel.find({ productId: productId, userId: req.user._id })
        res
          .status(200)
          .json({ message: "Increases quantity of item", data: data });
      } else {
        const addcart = await CartModel.insertOne({
          productId: productId,
          userId: req.user._id,
          price: checkProduct.price,
        });
        const data = await addcart.save();
        res.status(200).json({ message: "Item added into cart", data });
      }
    } else {
      res.status(404).json({ message: "No Product available" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong try again" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const cartData = await CartModel.find({ userId: req.user._id }).populate("productId");
    if (cartData.length > 0) {
      res
        .status(200)
        .json({ message: "successfully fetched cart data", data: cartData });
    } else {
      res
        .status(200)
        .json({
          message: "Your cart is empty, please add some items into cart",
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong try again" });
  }
};

const deleteFromCart = async(req, res) => {
  try {
    const {id} = req.params 
    const check = await CartModel.find({productId:id, userId: req.user._id});
    if(check){
        const deleteItem = await CartModel.deleteOne({productId:id, userId: req.user._id});
        return res.status(204).json({message:"Item deleted from cart successfully"})
    }else{
        return res.status(404).json({message:"No item found in cart"})
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "something went wrong try again" });
  }
};

module.exports = { addToCart, getAllCart, deleteFromCart };
