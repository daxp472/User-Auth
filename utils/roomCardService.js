const dayjs = require('dayjs');
const RoomCard = require('../models/RoomCard');
const User = require('../models/User');

// Constants
const INITIAL_ROOM_CARDS = 10;
const ROOM_EXPIRY_HOURS = 3;

// Create initial room cards for new user
const createInitialRoomCards = async (userId) => {
  const cards = [];
  for (let i = 0; i < INITIAL_ROOM_CARDS; i++) {
    cards.push({
      userId,
      type: 'basic',
      expiresAt: dayjs().add(ROOM_EXPIRY_HOURS, 'hour').toDate()
    });
  }
  
  await RoomCard.insertMany(cards);
  await User.findByIdAndUpdate(userId, { roomCardsCount: INITIAL_ROOM_CARDS });
};

// Get available room cards for a user
const getAvailableRoomCards = async (userId) => {
  return RoomCard.find({
    userId,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  });
};

// Use a room card
const useRoomCard = async (userId) => {
  const card = await RoomCard.findOne({
    userId,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  });

  if (!card) {
    throw new Error('No available room cards');
  }

  card.isUsed = true;
  await card.save();

  await User.findByIdAndUpdate(userId, { $inc: { roomCardsCount: -1 } });

  return card;
};

// Get room cards status
const getRoomCardsStatus = async (userId) => {
  const [total, available, used] = await Promise.all([
    RoomCard.countDocuments({ userId }),
    RoomCard.countDocuments({ 
      userId, 
      isUsed: false,
      expiresAt: { $gt: new Date() }
    }),
    RoomCard.countDocuments({ 
      userId, 
      isUsed: true 
    })
  ]);

  return {
    total,
    available,
    used
  };
};

module.exports = {
  createInitialRoomCards,
  getAvailableRoomCards,
  useRoomCard,
  getRoomCardsStatus
};