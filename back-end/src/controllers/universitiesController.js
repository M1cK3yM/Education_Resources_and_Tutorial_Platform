const University = require("../models/universities.model");

const getAllUniversities = async (req, res) => {
  try {
    const university = await University.find();
    res.status(200).json(university);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUniversitiesById = async (req, res) => {
  try {
    const universities = await University.findById(req.params.id);
    if (!universities) {
      return res.status(404).json({ message: "Universities not found" });
    }
    res.status(200).json(universities);
    console.log(req.params.universities);
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const createUniversity = async (req, res) => {
  const universities = new University({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    founded: req.body.founded,
    type: req.body.type,
    resources: req.body.resources,
    logo: req.body.logo,
  });
  try {
    const newUniversities = await universities.save();
    res.status(201).json(newUniversities);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUniversity = async (req, res) => {
  if (
    req.body.name ||
    req.body.description ||
    req.body.location ||
    req.body.founded ||
    req.body.type ||
    req.body.resources ||
    req.body.logo
  ) {
    const universities = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    if (!universities) {
      return res.status(404).json({ message: "universities not found" });
    }
    res.json(universities);
  } else {
    res.status(400).json({ message: "No updated field provided" });
  }
};

const deleteUniversity = async (req, res) => {
  console.log("Deleting  Universities by the id : ", req.params.id);
  try {
    const universities = await University.findByIdAndDelete(req.params.id);
    if (!universities) {
      return res.status(404).json({ message: "universities not found" });
    }
    res.status(200).json({ message: "universities deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUniversities,
  createUniversity,
  getUniversitiesById,
  updateUniversity,
  deleteUniversity,
};
