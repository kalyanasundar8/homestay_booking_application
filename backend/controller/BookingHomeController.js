const asyncHandler = require("express-async-handler");
const Homestay = require("../Models/HomestayModel.js");
const Booking = require("../Models/BookingModel.js");

//! [ Create booking, Route => POST/api/booking/booking-home ]
const createHomeBooking = asyncHandler(async (req, res) => {
  //? Destructure the booking model
  const { userId, homestayId, check_in_date, check_out_date } = req.body;

  //? Create a homebooking
  const homestay = await Homestay.findById(homestayId);
  const numNights = Math.ceil(
    (new Date(check_out_date) - new Date(check_in_date)) / (1000 * 3600 * 24)
  );
  const totalCost = numNights * homestay.price;

  const booking = await Booking.create({
    userId,
    homestayId,
    check_in_date,
    check_out_date,
    totalCost,
  });

  //? Check the booking
  if (booking) {
    res.status(200).json({
      _id: booking.id,
      userId: booking.userId,
      homestayId: booking.homestayId,
      check_in_date: booking.check_in_date,
      check_out_date: booking.check_out_date,
    });
  } else {
    res.status(400);
    throw new Error("Can't book now");
  }
  // const booking = new booking({
  //   userId,
  //   homestayId,
  //   check_in_date,
  //   check_out_date,
  //   totalCost,
  // });
});

module.exports = createHomeBooking;
