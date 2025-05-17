const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    title: String,
    body: String
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
