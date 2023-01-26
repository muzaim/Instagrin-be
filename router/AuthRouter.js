const express = require("express");
const router = express.Router();
const { Register, Login, Logout } = require("../controller/AuthController");

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);

module.exports = router;
