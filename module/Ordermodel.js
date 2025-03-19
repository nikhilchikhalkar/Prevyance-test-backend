// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

// Virtual field for Grand Total calculation
orderSchema.virtual('grandTotal').get(function() {
  return this.total; 
});

module.exports = mongoose.model('Order', orderSchema);
