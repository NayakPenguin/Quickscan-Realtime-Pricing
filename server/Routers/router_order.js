const express = require('express');
const { createOrder, getAllOrders, getOrderById } = require('../Controllers/creators/orderController');

const router = express.Router();

router.post('/create', createOrder);

router.get('/all', getAllOrders);

router.get('/:id', getOrderById);

module.exports = router;