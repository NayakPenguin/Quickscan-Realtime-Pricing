const Visit = require('../../Models/Visit');

const getUsersByCreatorShopId = async (req, res) => {
    const { creatorShopId } = req.params;

    try {
        // Find all visits associated with the given creatorShopId and sort them by lastVisit date in descending order
        const visits = await Visit.find({ creatorShopId }).sort({ lastVisit: -1 });

        // Extract user details from the visits
        const users = visits.map(visit => ({
            userId: visit.userId,
            lastVisit: visit.lastVisit
        }));

        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



module.exports = { getUsersByCreatorShopId };