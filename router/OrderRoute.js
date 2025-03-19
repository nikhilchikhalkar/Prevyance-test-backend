
const express = require('express');
const orderrouter = express.Router();
const orderController = require('../controller/OrderController.js');

// Route to create a new order
orderrouter.post('/create', orderController.createOrder);

// Route to update an order
orderrouter.put('/update/:id', orderController.updateOrder);

// Route to delete an order
orderrouter.delete('/delete/:id', orderController.deleteOrder);

module.exports = orderrouter;
