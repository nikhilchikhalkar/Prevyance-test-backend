
const Order = require('../module/Ordermodel');

// Create
exports.createOrder = async (req, res) => {
  try {
    const { productName, quantity, price } = req.body;

    // Calculate the total
    const total = quantity * price;

    const newOrder = new Order({
      productName,
      quantity,
      price,
      total,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, quantity, price } = req.body;

    // Calculate the total
    const total = quantity * price;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { productName, quantity, price, total },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
