require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const imageStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "events_image",
//     allowed_formats: ["jpg", "jpeg", "png", "gif"],
//   },
// });
//
// const documentStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "documents",
//     resource_type: "raw",
//     allowed_formats: ["pdf", "docx", "pptx"],
//   },
// });
//
// const uploadImage = multer({ storage: imageStorage });
// const uploadDocument = multer({ storage: documentStorage, onError: function(err) {console.error(JSON.stringify(err))} });
//
module.exports = {
  cloudinary
};


