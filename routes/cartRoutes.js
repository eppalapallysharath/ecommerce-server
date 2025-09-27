const express = require("express");
const router = express.Router()
const {addToCart, getAllCart, deleteFromCart} = require("../controllers/cartController.js")
const {authentication, authorization} =require("../middlewares/authmiddlewares.js")

router.post("/add", authentication, authorization("user"), addToCart)
router.get("/getAll", authentication, authorization("user"), getAllCart)
router.delete("/delete/:id",authentication, authorization("user") ,deleteFromCart )

module.exports=router