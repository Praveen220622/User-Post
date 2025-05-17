const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    username: String,
    email: String,
    phone: String,
    website: String,
    address: Object,
    company: Object
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
