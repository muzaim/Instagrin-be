const express = require("express");
const route = express.Router();
const multer = require("multer");
const { store, index } = require("../controller/PostController");
const VerifyToken = require("./VerifyToken");

// multer
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

route.post("/post", VerifyToken, upload.single("photo"), store);
route.get("/post", VerifyToken, index);

module.exports = route;
