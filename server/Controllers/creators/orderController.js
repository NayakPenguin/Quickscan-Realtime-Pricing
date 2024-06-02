const Order = require('../../Models/Order');

// Function to create a new order
const createOrder = async (req, res) => {
    const { orderId, canceledOrder, paymentCompleted, tableName, timeOfOrder, totalPrice, userDetails, orderDetails } = req.body;

    try {
        // Check if the orderId already exists
        let existingOrder = await Order.findOne({ orderId });
        if (existingOrder) {
            return res.status(400).json({ message: 'Order ID already exists' });
        }

        const newOrder = new Order({
            orderId,
            canceledOrder,
            paymentCompleted,
            tableName,
            timeOfOrder,
            totalPrice,
            userDetails,
            orderDetails
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get a single order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById };