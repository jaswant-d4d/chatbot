const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    unique: true,
    sparse: true // allows multiple null values
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

