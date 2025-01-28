const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");
const router = express.Router();

// Get all orders (Manager View)
router.get("/", protect(["Manager", "Admin"]), async (req, res) => {
    try {
      console.log("Orders route hit");  // Debug log to see if this route is being accessed.
      console.log("User ID:", req.user.id);
      const orders = await Order.find().populate("employee", "name email");
  
      console.log("Orders fetched successfully:", orders); // Log fetched orders for debugging
  
      res.status(200).json(orders);
    } catch (err) {
      console.error("Error fetching orders:", err.message);  // Log the error message
      res.status(500).json({ error: err.message });
    }
  });
  
  

// Employee creates an order                                                    
router.post("/", protect(["Employee"]), async (req, res) => {
  try {
    const { customerName, cloth, rentDuration, totalCost } = req.body;
    const order = new Order({
      employee: req.user.id,
      customerName,
      cloth,
      rentDuration,
      totalCost,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update order status (Manager completes an order)
router.put("/:id", protect(["Manager", "Admin"]), async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
