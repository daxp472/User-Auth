const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  dob: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    default: '',
    maxLength: 500
  },
  roomCardsCount: {
    type: Number,
    default: 0
  },
  resetPasswordOTP: {
    code: {
      type: String,
      default: null
    },
    expiresAt: {
      type: Date,
      default: null
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);