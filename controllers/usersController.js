const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

// Get all users with nested posts and comments
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        const usersWithPosts = await Promise.all(users.map(async (user) => {
            const posts = await Post.find({ userId: user.id });

            const postsWithComments = await Promise.all(posts.map(async (post) => {
                const comments = await Comment.find({ postId: post.id });
                return { ...post.toObject(), comments };
            }));

            return { ...user.toObject(), posts: postsWithComments };
        }));

        res.status(200).json(usersWithPosts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};

// Get single user by ID with nested posts and comments
const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ id: parseInt(req.params.id) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const posts = await Post.find({ userId: user.id });

        const postsWithComments = await Promise.all(posts.map(async (post) => {
            const comments = await Comment.find({ postId: post.id });
            return { ...post.toObject(), comments };
        }));

        res.status(200).json({ ...user.toObject(), posts: postsWithComments });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: 'Error creating user', error: err.message });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: 'Error updating user', error: err.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
