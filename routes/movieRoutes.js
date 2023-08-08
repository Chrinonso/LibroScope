const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');




const {
    createMovie,
    getAllMovies,
    getAllUserMovies,
    getSingleMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movieController');

router.route('/').post(authenticateUser, createMovie).get(authenticateUser, getAllMovies)
router.route('/getAllUserMovies').get(authenticateUser, getAllUserMovies);
router.route('/:id').patch(authenticateUser, updateMovie);
router.route('/:id').delete(authenticateUser, deleteMovie);

router.route('/:id').get(authenticateUser, getSingleMovie);


module.exports = router;