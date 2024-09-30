const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

const News = mongoose.model("News", newsSchema);

// News.createSearchIndex({
//   name: "searchNews",
//   definition: {
//     mappings: {
//       dynamic: true,
//     },
//   },
// });

module.exports = News;
