const Post = require('../models/postModel');
const User = require('../models/userModel'); // Optional: to verify user existence

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts', error: err.message });
    }
};

// Get a post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({ id: parseInt(req.params.id) });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching post', error: err.message });
    }
};

// Create a new post for a particular userId
const createPost = async (req, res) => {
    try {
        const { userId, id, title, body } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required to create a post' });
        }

        // Optional: Verify user exists
        const userExists = await User.findOne({ id: userId });
        if (!userExists) {
            return res.status(404).json({ message: `User with id ${userId} not found` });
        }

        const newPost = new Post({ id, userId, title, body });
        await newPost.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: 'Error creating post', error: err.message });
    }
};

// Update a post by ID
const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            req.body,
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: 'Error updating post', error: err.message });
    }
};

// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting post', error: err.message });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
