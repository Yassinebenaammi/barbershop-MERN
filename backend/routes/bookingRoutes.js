import express from 'express';
import { createBooking, deleteBookingById, getAllBookings } from '../controllers/bookingController.js';

const router = express.Router();

// POST - Create a booking
router.post('/book', createBooking);

// GET - Get all bookings
router.get('/all-bookings', getAllBookings); // Fetch all bookings from the database



// Assuming you have a `Booking` model and express set up
router.delete('/bookings/:id',deleteBookingById);
  
export default router;

