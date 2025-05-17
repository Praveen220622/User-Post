const express = require('express');
const router = express.Router();

const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/postsController');

// GET all posts
router.get('/', getAllPosts);

// GET post by ID
router.get('/:id', getPostById);

// POST create new post
router.post('/', createPost);

// PUT update post by ID
router.put('/:id', updatePost);

// DELETE post by ID
router.delete('/:id', deletePost);

module.exports = router;
