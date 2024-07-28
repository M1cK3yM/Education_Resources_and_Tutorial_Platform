const express = require('express');
const router = express.Router();
const UniversityController = require('../controllers/UniversityController');
router.get('/', UniversityController.getAllUniversities);
router.get('/:id', UniversityController.getUniversityById);
router.post('/', UniversityController.createUniversity);
router.put('/:id', UniversityController.updateUniversity);
router.delete('/:id', UniversityController.deleteUniversity);

module.exports = router;