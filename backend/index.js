import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors'
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();
app.use(cors());

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api', bookingRoutes);

// Set up server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
