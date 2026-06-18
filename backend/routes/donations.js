import express from 'express';
import { body, validationResult } from 'express-validator';
import { FoodDonation } from '../models/FoodDonation.js';
import { User } from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all available donations
router.get('/available', async (req, res) => {
  try {
    const donations = await FoodDonation.find({ status: 'available' })
      .populate('donorId', 'name organization phone address')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get donations by donor
router.get('/donor', authMiddleware, async (req, res) => {
  try {
    const donations = await FoodDonation.find({ donorId: req.userId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get claimed donations by receiver
router.get('/claimed', authMiddleware, async (req, res) => {
  try {
    const donations = await FoodDonation.find({ claimedBy: req.userId })
      .populate('donorId', 'name organization phone address')
      .sort({ claimedAt: -1 });
    
    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Post a new food donation
router.post('/post', authMiddleware, [
  body('foodItem').notEmpty().withMessage('Food item is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive number'),
  body('servings').notEmpty().withMessage('Servings information is required'),
  body('pickupLocation').notEmpty().withMessage('Pickup location is required'),
  body('expiryTime').notEmpty().withMessage('Expiry time is required'),
  body('pickupTime').notEmpty().withMessage('Pickup time is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { foodItem, description, quantity, servings, pickupLocation, expiryTime, pickupTime, image } = req.body;

    // Get donor details
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create new donation
    const donation = new FoodDonation({
      donorId: req.userId,
      donorName: user.name,
      foodItem,
      description,
      quantity,
      servings,
      pickupLocation,
      expiryTime: new Date(expiryTime),
      pickupTime: new Date(pickupTime),
      image,
    });

    await donation.save();

    res.status(201).json({
      success: true,
      message: 'Donation posted successfully',
      data: donation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Claim a donation
router.put('/claim/:donationId', authMiddleware, async (req, res) => {
  try {
    const { donationId } = req.params;

    const donation = await FoodDonation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    if (donation.status !== 'available') {
      return res.status(400).json({ success: false, message: 'This donation is no longer available' });
    }

    donation.status = 'claimed';
    donation.claimedBy = req.userId;
    donation.claimedAt = new Date();

    await donation.save();

    res.status(200).json({
      success: true,
      message: 'Donation claimed successfully',
      data: donation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Delete a donation (only by donor)
router.delete('/:donationId', authMiddleware, async (req, res) => {
  try {
    const { donationId } = req.params;

    const donation = await FoodDonation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }

    if (donation.donorId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await FoodDonation.findByIdAndDelete(donationId);

    res.status(200).json({
      success: true,
      message: 'Donation deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

export default router;
