const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerName: { type: String, required: true },
  cloth: { type: String, required: true },
  rentDuration: { type: Number, required: true }, // Duration in days
  totalCost: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

module.exports = mongoose.model("Order", OrderSchema);
