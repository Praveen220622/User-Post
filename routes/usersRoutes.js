const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/usersController');

// GET all users
router.get('/', getAllUsers);

// GET user by ID
router.get('/:id', getUserById);

// POST create new user
router.post('/', createUser);

// PUT update user by ID
router.put('/:id', updateUser);

// DELETE user by ID
router.delete('/:id', deleteUser);

module.exports = router;
