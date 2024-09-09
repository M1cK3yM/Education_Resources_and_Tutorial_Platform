const Resource = require("../models/resource.model");
const { uploadDocument } = require("../middleware/cloudinaryConfig");
const pdf = require("pdf-parse");
const axios = require("axios");

const createResource = async (req, res) => {
  try {
    const response = await axios.get(req.file.path, {
      responseType: "arraybuffer", // Fetch the file as a buffer
    });

    const pdfBuffer = Buffer.from(response.data); // Convert response data to buffer

    // Extract PDF details
    const pdfData = await pdf(pdfBuffer);

    const numberOfPages = pdfData.numpages; // Get number of pages from the PDF

    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      tags: req.body.tags ? req.body.tags.split(",") : [],
      resource: req.file ? req.file.path : null, // Store Cloudinary URL in the database
      size: req.file.size,
      numberOfPages: numberOfPages,
      createdBy: res.locals.user?._id,
    });

    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: "Server Error" });
    console.error(err);
  }
};

// Get all resources
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching resources" });
  }
};

// Get a single resource by ID
const getResourceById = async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await Resource.findById(id).populate(
      "createdBy",
      "username email"
    );
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
};

// Delete a resource by ID
const deleteResource = async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await Resource.findByIdAndDelete(id);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchResource = async (req, res) => {
  try {
    const pipeline = [
      {
        $search: {
          index: "searchResources",
          text: {
            query: req.params.q,
            path: {
              wildcard: "*",
            },
            fuzzy: {},
          },
        },
      },
      {
        $sort: {
          score: {
            $meta: "textScore",
          },
        },
      },
    ];

    const response = await Resource.aggregate(pipeline);
    if (!response) {
      return res.status(404).json({ message: "Resource not found" });
    }

    console.log(response);

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  // createResource: [uploadDocument.single("resource"), createResource],
  createResource,
  getAllResources,
  getResourceById,
  deleteResource,
  updateResource,
  searchResource,
};
