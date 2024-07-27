const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
 author: {
    type: String,
    required: true,
  },
  publicationdate: {
    type: Date,
    required: true,
  },
 updateddate: {
    type: Date,
    required: true,
  },
 tags: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;