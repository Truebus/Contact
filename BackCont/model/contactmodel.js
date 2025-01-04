const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    phonetype: {
        type: String,
        required: true,
        enum: ['Mobile', 'Work', 'Home', 'Custom', 'Other'],
        default: 'Mobile'
    },
    mobilenumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    address: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
});

const contactapp = mongoose.model('contact', contactSchema);
module.exports = contactapp;
