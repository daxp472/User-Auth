const mongoose = require('mongoose');

const roomCardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['basic', 'premium', 'vip'],
    default: 'basic'
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    default: null
  }
});

// Virtual property to check if the card is expired
roomCardSchema.virtual('isExpired').get(function() {
  return Date.now() > this.expiresAt;
});

// Virtual property to check if the card is available
roomCardSchema.virtual('isAvailable').get(function() {
  return !this.isUsed && !this.isExpired;
});

module.exports = mongoose.model('RoomCard', roomCardSchema);