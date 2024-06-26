// routes/players.js
const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Add or get player by username
router.post('/', async (req, res) => {
    const { username } = req.body;
    try {
        let player = await Player.findOne({ username });
        if (!player) {
            player = new Player({ username });
            await player.save();
        }
        res.status(201).json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update player's score
router.put('/:username', async (req, res) => {
    const { username } = req.params;
    const { score } = req.body;
    try {
        const player = await Player.findOneAndUpdate({ username }, { score }, { new: true });
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get scoreboard
router.get('/scoreboard', async (req, res) => {
    try {
        const scoreboard = await Player.find().sort({ score: -1 }).limit(10); // Fetch top 10 players by score
        res.json(scoreboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
