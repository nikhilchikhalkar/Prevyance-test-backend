const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // You might want to ensure the email is unique
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true // Optionally, you can ensure mobile is unique
    },
    address: {
        type: String,
        required: false 
    },
    profilePicture: {
        type: String, // You can store the URL 
        required: false 
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
