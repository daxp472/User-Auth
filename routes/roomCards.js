const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAvailableRoomCards,
  useRoomCard,
  addRewardRoomCards,
  getRoomCardsStatus
} = require('../utils/roomCardService');

// Get user's room cards status
router.get('/status', auth, async (req, res) => {
  try {
    const status = await getRoomCardsStatus(req.user.userId);
    res.json(status);
  } catch (error) {
    console.error('Error getting room cards status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get available room cards
router.get('/available', auth, async (req, res) => {
  try {
    const cards = await getAvailableRoomCards(req.user.userId);
    res.json(cards);
  } catch (error) {
    console.error('Error getting available room cards:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Use a room card
router.post('/use', auth, async (req, res) => {
  try {
    const card = await useRoomCard(req.user.userId);
    res.json({
      message: 'Room card used successfully',
      card
    });
  } catch (error) {
    console.error('Error using room card:', error);
    if (error.message === 'No available room cards') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Add reward room cards (protected admin route - you'll need to add admin middleware)
router.post('/reward', auth, async (req, res) => {
  try {
    const { userId, count, type } = req.body;
    await addRewardRoomCards(userId, count, type);
    res.json({
      message: `${count} ${type} room cards added successfully`
    });
  } catch (error) {
    console.error('Error adding reward room cards:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;