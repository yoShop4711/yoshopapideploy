const ProductPhotoRoute = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const ProductPhoto = require("../models/ProductPhotoModel");
const verify = require("../middleware/verify")
const authSeller = require("../middleware/authSeller")
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage });

ProductPhotoRoute.post(
  "/product/upload",
  verify,
  authSeller,
 upload.single("ProductImage"),
  expressAsyncHandler(async (req, res) => {
    await ProductPhoto.create({
        ProductPhoto: {
        data: fs.readFileSync("./public/" + req.file.filename),
        contentType: "image/jpg",
      },
    });

    res.json({ msg: "image has been succesfully uploaded" });
  })
);

ProductPhotoRoute.get(
  "/product/show_last",
  verify,
  authSeller,
  expressAsyncHandler(async (req, res) => {
    const results = await ProductPhoto.find().sort({ _id: -1 }).limit(1);
    res.json({ results });
  })
);

ProductPhotoRoute.get(
  "/product/show_all",
  expressAsyncHandler(async (req, res) => {

const results = await ProductPhoto.find()

res.json({results})

  })
);

module.exports = ProductPhotoRoute;
