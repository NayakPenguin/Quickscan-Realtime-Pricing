const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Creator = require('../../Models/Creator');
const bcrypt = require('bcryptjs');

const otpStorage = {};

const loginCreator = async (req, res) => {
    const { creatorShopId, password } = req.body;

    try {
        // Find the creator by creatorShopId
        const creator = await Creator.findOne({ creatorShopId });
        if (!creator) {
            return res.status(400).json({ message: 'Invalid creator shop name or password' });
        }

        // Compare the password
        const isMatch = (password == creator.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid creator shop name or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { creatorId: creator._id, creatorShopId: creator.creatorShopId },
            process.env.JWT_SECRET,
            { expiresIn: '10y' }
        );

        const decoded = jwt.decode(token);

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error logging in creator:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { loginCreator };