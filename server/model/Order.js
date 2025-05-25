import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerId: { type: String, ref: "User" },
  items: [
    {
      serviceId: { type: String, ref: "Service" },
      serviceName: { type: String },
      quantity: { type: Number },
    },
  ],
  status: { type: String, default: "Pending" },
  scheduledDate: String,
  scheduledTime: String,
  paymentType: String,
  paymentStatus: { type: String, default: "Pending" },
  address: { type: String, ref: "address" },
  amount: { type: Number },
});

export default mongoose.model("Order", OrderSchema);
