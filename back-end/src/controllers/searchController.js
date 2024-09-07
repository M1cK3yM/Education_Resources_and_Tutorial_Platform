const User = require("../models/users.model.js");
const Event = require("../models/event.model.js");
const Resource = require("../models/resource.model.js");
const University = require("../models/universities.model.js");
const News = require("../models/news.model.js");

const searchAll = async (req, res) => {
  const query = req.params.q;

  const collections = [
    { model: User, sIndex: "searchUsers", match: { role: { $ne: "admin" } } },
    { model: Event, sIndex: "searchEvents" },
    { model: Resource, sIndex: "searchResources" },
    { model: University, sIndex: "searchUniversities" },
    { model: News, sIndex: "searchNews" },
  ];

  let combinedResults = [];
  try {
    for (const collection of collections) {
      const pipeline = [
        {
          $search: {
            index: collection.sIndex,
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
              fuzzy: {},
            },
          },
        },
        {
          $addFields: {
            score: { $meta: "searchScore" },
            collectionName: collection.model.modelName, // Add the collection name to the result
          },
        },
      ];

      if (collection.model === User) {
        pipeline.push({ $match: collection.match });
      }

      const response = await collection.model.aggregate(pipeline);

      if (response.length > 0) {
        combinedResults = [...combinedResults, ...response];
      }
    }

    combinedResults.sort((a, b) => b.score - a.score);
    console.log("Combined results:", combinedResults);

    if (combinedResults.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    return res.status(200).json(combinedResults);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { searchAll };
