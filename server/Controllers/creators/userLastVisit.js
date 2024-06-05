const Visit = require('../../Models/Visit');

const getUsersByCreatorShopId = async (req, res) => {
    const { creatorShopId } = req.params;

    try {
        const visits = await Visit.find({ creatorShopId }).sort({ lastVisit: -1 });
        
        const users = visits.map(visit => ({
            userId: visit.userId,
            userName: visit.userName,
            userPhone: visit.userPhone,
            userEmail: visit.userEmail,
            lastVisit: visit.lastVisit
        }));

        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



module.exports = { getUsersByCreatorShopId };