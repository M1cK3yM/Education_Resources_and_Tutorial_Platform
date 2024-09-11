const Resource = require("../models/resource.model");
const pdfParse = require("pdf-parse");
const pdfThumb = require("pdf-thumbnail");
const {cloudinary} = require("../middleware/cloudinaryConfig");
const streamifier = require("streamifier");
const fs = require("fs");
const { uploadPdf } = require("../middleware/firebase.middleware");

const createResource = async (req, res) => {
  try {
    const pdfData = await pdfParse(req.file.buffer);

    const thumbStream = await pdfThumb(req.file.buffer, {
       compress: {
        type:"JPEG",
        quality: 70
      }
    });
    const thumbBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      thumbStream.on('data', chunk => chunks.push(chunk));
      thumbStream.on('end', () => resolve(Buffer.concat(chunks)));
      thumbStream.on('error', reject);
    });

    const thumb = await new Promise((resolve, reject) =>{
      const cld_thumb_upstream = cloudinary.uploader.upload_stream(
        { folder: 'resources' },
        (error, result) => {
          if (result) {
            resolve(result);
          } else { resolve(error)};
        }
      )

      streamifier.createReadStream(thumbBuffer).pipe(cld_thumb_upstream);
    })

    console.log(thumb);

    const numberOfPages = pdfData.numpages;

    const pdfUrl = await uploadPdf(req.file.originalname, req.file.buffer);

    if (pdfUrl.success) {
      const resource = new Resource({
          title: req.body.title,
          description: req.body.description,
          type: req.body.type,
          tags: req.body.tags ? req.body.tags.split(",") : [],
          resource: pdfUrl.url, // Store Cloudinary URL in the database
          coverImage: thumb.url,
          size: req.file.size,
          numberOfPages: numberOfPages,
          createdBy: res.locals.user?._id,
        });

        const newResource = await resource.save();
        return res.status(201).json(newResource);
    }

    return res.status(500).json({ message: pdfUrl.message})

    } catch (err) {
    res.status(500).json({ message: "Server Error" });
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
