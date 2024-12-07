import Booking from "../models/bookingModel.js"

// Create a booking
export const createBooking = async (req, res) => {
  try {
    const { customerName, service, date, time } = req.body;

    // Ensure data is valid
    if (!customerName || !service || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if date and time are in correct format
    const parsedDate = new Date(date);
    const parsedTime = new Date(`1970-01-01T${time}:00`);

    // Check if date and time are valid
    if (isNaN(parsedDate) || isNaN(parsedTime)) {
      return res.status(400).json({ message: 'Invalid date or time format' });
    }

    const newBooking = new Booking({
      customerName,
      service,
      date: parsedDate,
      time: parsedTime,
    });
    

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking', error });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find(); // Retrieve all bookings from the database
    res.status(200).json(bookings);  // Send the bookings as the response
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};



export const deleteBookingById = async (req, res) => {
  const { id } = req.params;
    Booking.findByIdAndDelete(id)
      .then((deletedBooking) => {
        if (!deletedBooking) {
          return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error deleting booking", error: err });
      });
};

