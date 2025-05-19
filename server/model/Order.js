import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  serviceId: String,
  customerName: String,
  sellerId: String,
  status: { type: String, default: 'Pending' },
  scheduledAt: Date,
});