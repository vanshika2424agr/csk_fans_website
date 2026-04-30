import { Router } from 'express';
import { createBooking, getMyBookings, getAllBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public route for testing
router.get('/all', getAllBookings);

// Protected routes
router.use(protect);
router.post('/',  createBooking);
router.get('/my', getMyBookings);

export default router;
