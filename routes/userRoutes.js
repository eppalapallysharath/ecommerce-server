const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getProfile,
} = require("../controllers/usersController.js");
const { authentication } = require("../middlewares/authmiddlewares.js");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authentication, getProfile);

module.exports = router;
