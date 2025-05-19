import mongoose from "mongoose";

const SellerServiceSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: String, ref: 'Service', required: true },
  isAvailable: { type: Boolean, default: true },
  priceOverride: { type: Number },
  timeOverride: { type: String }
});


export const SellerService = mongoose.model('SellerService', SellerServiceSchema);