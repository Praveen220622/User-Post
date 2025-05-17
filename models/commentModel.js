const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id: Number,
    postId: Number,
    name: String,
    email: String,
    body: String
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
