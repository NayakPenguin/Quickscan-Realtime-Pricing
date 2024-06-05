const express = require('express');
const { createOrder, getAllOrders, getOrderById, getOrdersByCreatorShopId, getOrdersByCreatorUserId } = require('../Controllers/creators/orderController');

const router = express.Router();

router.post('/create', createOrder);

router.get('/all', getAllOrders);

router.get('/:id', getOrderById);

router.get('/byCreatorShopId/:creatorShopId', getOrdersByCreatorShopId);

router.get('/byUserId/:creatorUserId', getOrdersByCreatorUserId);

module.exports = router;