const Visit = require('../../Models/Visit');

const addVisit = async (req, res) => {
    const { userId, creatorShopId, userName, userPhone, userEmail } = req.body;

    try {
        const result = await Visit.findOneAndUpdate(
            { userId, creatorShopId }, 
            { lastVisit: new Date(), userName, userPhone, userEmail }, 
            { upsert: true, new: true } 
        );

        if (result) {
            console.log(`Visit updated for userId: ${userId}, creatorShopId: ${creatorShopId}`);
        } else {
            console.log(`Visit created for userId: ${userId}, creatorShopId: ${creatorShopId}`);
        }

        res.status(200).json({ message: 'Visit recorded successfully', visit: result });
    } catch (error) {
        console.error('Error recording visit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addVisit };