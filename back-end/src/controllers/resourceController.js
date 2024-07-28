const Resource = require("../models/resource.model");


const getAllResource = async (req, res) => {
  try {
    const Resource = await Resource.find();
    res.status(200).json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(resource);
    console.log(req.params.resource);
  } catch {
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

const updateResource = async (req, res) => {
  if (
    req.body.title ||
    req.body.description ||
    req.body.type ||
    req.body.url ||
    req.body.tags ||
    req.body.createdBy ||
    req.body.createdAt||
    req.body.updatedAt
  ) {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!resource) {
      return res.status(404).json({ message: "resource not found" });
    }
    res.json(resource);
  } else {
    res.status(400).json({ message: "No updated field provided" });
  }
};

const deleteResource = async (req, res) => {
  console.log("Deleting resource by the id : ", req.params.id);
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "resource not found" });
    }
    res.status(200).json({ message: "resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllResource,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
};
