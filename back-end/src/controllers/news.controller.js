const News = require("../models/news.model");

const getAllNews = async (_req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const createNews = async (req, res) => {
  const news = new News({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publicationdate: req.body.publicationdate,    
    updateddate: req.body.updateddate,
    tags: req.body.tags,
    image: req.body.image,
    status: req.body.status,
  });
  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateNews = async (req, res) => {
  if (
    req.body.title ||
    req.body.content ||
    req.body.author ||
    req.body.publicationdate ||
    req.body.updateddate ||
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
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllNews,
  createNews,
  getNewsById,
  updateNews,
  deleteNews,
};