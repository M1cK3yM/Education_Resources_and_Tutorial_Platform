const express = require('express');
const router = express.Router();
const ratingController = require('.controllers/ratingController');

router.post('/ratings', ratingController.createRating);
router.get('/ratings', ratingController.getRatings);
router.get('/ratings/:id', ratingController.getRatingById);
router.patch('/ratings/:id', ratingController.updateRating);
router.delete('/ratings/:id', ratingController.deleteRating);

module.exports = router;