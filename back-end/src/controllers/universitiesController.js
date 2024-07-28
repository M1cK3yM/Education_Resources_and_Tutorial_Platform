const University = require("../models/University");
const Resource = require("../models/Resource");

const UniversityController = {
  getAllUniversities: async (req, res) => {
    try {
      const universities = await University.find({}).populate("resources");
      res.status(200).json(universities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUniversityById: async (req, res) => {
    try {
      const university = await University.findById(req.params.id).populate("resources");
      if (!university) {
        return res.status(404).json({ message: "University not found" });
      }
      res.status(200).json(university);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUniversity: async (req, res) => {
    try {
      const { name, description, location, founded, type } = req.body;
      const university = new University({
        name,
        description,
        location,
        founded,
        type,
      });
      await university.save();
      res.status(201).json(university);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateUniversity: async (req, res) => {
    try {
      const university = await University.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!university) {
        return res.status(404).json({ message: "University not found" });
      }
      res.status(200).json(university);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteUniversity: async (req, res) => {
    try {
      const university = await University.findByIdAndDelete(req.params.id);
      if (!university) {
        return res.status(404).json({ message: "University not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UniversityController;