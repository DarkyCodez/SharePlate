import mongoose from 'mongoose';

const foodDonationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  donorName: {
    type: String,
    required: true,
  },
  foodItem: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  quantity: {
    type: Number,
    required: true,
  },
  servings: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'expired'],
    default: 'available',
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  claimedAt: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);
