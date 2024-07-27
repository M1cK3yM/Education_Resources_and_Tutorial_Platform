const Resource = require("../models/resource.model");


const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createResource = async (req, res) => {
  const resource = new Resource({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    url: req.body.url,
    tags: req.body.tags,
    createdBy: req.body.createdBy,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  });
  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllResource,
  createResource,
};
