const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
    createBook,
    getAllBooks,
    getAllUserBooks,
    getSingleBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

router.route('/').get(authenticateUser, getAllBooks).post(authenticateUser, createBook);

router.route('/getAllUserBooks').get(authenticateUser, getAllUserBooks);

router.route('/:id').get(authenticateUser, getSingleBook).patch(authenticateUser, updateBook).delete(authenticateUser, deleteBook);

module.exports = router;



