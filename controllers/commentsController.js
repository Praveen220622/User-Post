const Comment = require('../models/commentModel');
const Post = require('../models/postModel');     // To verify post existence
const User = require('../models/userModel');     // To verify user existence (optional)

// Get all comments
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching comments', error: err.message });
    }
};

// Get a comment by ID
const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findOne({ id: parseInt(req.params.id) });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching comment', error: err.message });
    }
};

// Create a new comment for a particular post and user
const createComment = async (req, res) => {
    try {
        const { id, postId, name, email, body, userId } = req.body;

        // Validate required fields
        if (!postId) {
            return res.status(400).json({ message: 'postId is required' });
        }
        if (!name) {
            return res.status(400).json({ message: 'name is required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }
        if (!body) {
            return res.status(400).json({ message: 'body is required' });
        }

        // Check if post exists
        const postExists = await Post.findOne({ id: postId });
        if (!postExists) {
            return res.status(404).json({ message: `Post with id ${postId} not found` });
        }

        // Optional: If you want to link comment with a user by userId and verify
        if (userId) {
            const userExists = await User.findOne({ id: userId });
            if (!userExists) {
                return res.status(404).json({ message: `User with id ${userId} not found` });
            }
        }

        // Create comment object
        const newComment = new Comment({ id, postId, name, email, body });

        await newComment.save();
        res.status(201).json(newComment);

    } catch (err) {
        res.status(400).json({ message: 'Error creating comment', error: err.message });
    }
};

// Update a comment by ID
const updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            req.body,
            { new: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: 'Error updating comment', error: err.message });
    }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting comment', error: err.message });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
};
