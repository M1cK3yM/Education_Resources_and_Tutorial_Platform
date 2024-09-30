const News = require("../models/news.model");
const { uploadImage } = require("../middleware/cloudinaryConfig");

const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 10;'om'

    const news = await News.find().sort({ date: 1 }).skip(skip).limit(10);

    const totalNews = await News.countDocuments();
    const pages = Math.ceil(totalNews / 10);

    res.status(200).json({ news: news, pages: pages });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
};

const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
    console.log(req.params.id);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};

const createNews = async (req, res) => {
  const news = new News({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    tags: req.body.tags,
    image: req.file ? req.file.path : null,
    status: req.body.status,
  });
  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: "Server Error" });
    console.error(err);
  }
};

const updateNews = async (req, res) => {
  if (
    req.body.title ||
    req.body.content ||
    req.body.author ||
    req.body.tags ||
    req.body.image ||
    req.body.status
  ) {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json(news);
  } else {
    res.status(400).json({ message: "No updated field provided" });
  }
};

const deleteNews = async (req, res) => {
  console.log("Deleting news by the id : ", req.params.id);
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
};

module.exports = {
  getAllNews,
  createNews: [uploadImage.single("image"), createNews],
  getNewsById,
  updateNews,
  deleteNews,
};
