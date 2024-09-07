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

// const createResource = async (req, res) => {
//   const resource = new Resource(req.body);
//   try {
//     const newResource = await resource.save();
//     res.status(201).json(newResource);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
const createResource = async (req, res) => {
  try {
    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.body.createdBy,
      createdAt: req.body.createdAt,
      tag: req.body.tag,
      type: req.body.type,
    });
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: "server error" });
    console.error(err);
  }
};

const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
  getAllResource,
  createResource,
  getResourceById,
  updateResource,
  deleteResource,
  searchResource,
};
