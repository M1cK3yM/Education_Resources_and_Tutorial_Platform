const Resource = require("../models/resource.model");

const getAllResource = async (_req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createResource = async (req, res) => {
  const resource = new Resource(req.body);
  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(resource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllResource,
  createResource,
  getResourceById,
  updateResource,
  deleteResource
};
