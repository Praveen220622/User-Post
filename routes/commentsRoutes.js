const express = require('express');
const router = express.Router();

const {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
} = require('../controllers/commentsController');

// GET all comments
router.get('/', getAllComments);

// GET comment by ID
router.get('/:id', getCommentById);

// POST create new comment
router.post('/', createComment);

// PUT update comment by ID
router.put('/:id', updateComment);

// DELETE comment by ID
router.delete('/:id', deleteComment);

module.exports = router;
