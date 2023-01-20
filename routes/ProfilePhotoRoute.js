const ProfilePhotoRoute = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const verify = require("../middleware/verify");
const UserProfilePhoto = require("../models/UserPhotoModel");
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

ProfilePhotoRoute.post(
  "/profile/upload",

  upload.single("UserImage"),
  expressAsyncHandler(async (req, res) => {
    await UserProfilePhoto.create({
        UserImage: {
        data: fs.readFileSync("./public/" + req.file.filename),
        contentType: "image/jpg",
      },
    });

    res.json({ msg: "profile picture has been succesfully uploaded" });
  })
);

ProfilePhotoRoute.get(
  "/profile/show_last",
  expressAsyncHandler(async (req, res) => {
    const results = await UserProfilePhoto.find().sort({ _id: -1 }).limit(1);
    res.json({ results });
  })
);

ProfilePhotoRoute.get(
  "/profile/show_all",
  expressAsyncHandler(async (req, res) => {

const results = await UserProfilePhoto.find()

res.json({results})

  })
);

module.exports = ProfilePhotoRoute;
