require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image storage
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events_image",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

// Video storage
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "videos",
    allowed_formats: ["mp4", "avi", "mov", "mkv"],
  },
});

// Document storage
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "documents",
    allowed_formats: ["pdf", "docx", "pptx"],
  },
});

// const resourceStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "document",
//     allowed_formats: ["pdf", "docx", "pptx"],
//   },
// });

// Create separate multer instances for each resource type
const uploadImage = multer({ storage: imageStorage });
const uploadVideo = multer({ storage: videoStorage });
const uploadDocument = multer({ storage: documentStorage });
// const uploadResource = multer({ storage: resourceStorage });

module.exports = {
  uploadImage,
  uploadVideo,
  uploadDocument,
  // uploadResource,
};
