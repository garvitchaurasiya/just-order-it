const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array
    }
}, {timestamps: true});

module.exports = mongoose.model('user', UserSchema);