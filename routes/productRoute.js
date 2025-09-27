const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  postProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} = require("../controllers/productController.js");
const {UsersModel} = require("../models/userModel.js")
const {authentication, authorization} = require("../middlewares/authmiddlewares.js");
const { upload } = require("../config/Multer.js");



router.get("/", getAllProducts);
router.post("/", upload.single("image"), authentication, authorization("admin") ,postProduct);
router.get("/:id", getProduct);
router.put("/:id",upload.single("image"), authentication, authorization("admin"), updateProduct);
router.delete("/:id", authentication, authorization("admin"),deleteProduct);

module.exports = router;
