const asyncHandler = require("express-async-handler");
const Homestay = require("../Models/HomestayModel.js");
const Booking = require("../Models/BookingModel.js");

//! [ Create homestays, GET/api/homestay/create_homestays ]
const createHomestays = asyncHandler(async (req, res) => {
  //? Destructure a homestays model
  const { name, location, description, price } = req.body;

  //? Check all fields
  if (!name || !location || !description || !price) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //? Create a homestays
  const homestays = await Homestay.create({
    name,
    location,
    description,
    price,
  });

  //? check the homestay details
  if (homestays) {
    res.status(200).json({
      _id: homestays.id,
      name: homestays.name,
      location: homestays.location,
      description: homestays.description,
      price: homestays.price,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

//! [ Get homestays, GET/api/homestay/:id ]
const getHomestayById = asyncHandler(async (req, res) => {
  const homestayId = req.params.id;

  // Fetch the homestay by ID
  try {
    const homestay = await Homestay.findById(homestayId);
    if (homestay) {
      res.json(homestay);
    } else {
      res.status(404).json({ error: "Homestay not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error fetching homestay details" });
  }
});

//! [ Get homestays, GET/api/homestay/homestays_avail ]
const getHomeStay = asyncHandler(async (req, res) => {
  //? Destructure a check_in_date and check_out_date from booking
  const { check_in_date, check_out_date } = req.body;

  //?  Get an available homestays
  try {
    const availHomeStays = await Homestay.find({
      _id: { $nin: await getBookedHomestaysIds(check_in_date, check_out_date) },
    });

    res.json(availHomeStays);
  } catch (error) {
    res.status(400).json({ error: "Can't find " });
  }
});

//? Find a Booked homestays Id for given date
async function getBookedHomestaysIds(check_in_date, check_out_date) {
  const bookedIds = await Booking.distinct("homestayId", {
    $or: [
      { check_in_date: { $gte: check_in_date, $lte: check_out_date } },
      { check_out_date: { $gte: check_in_date, $lte: check_out_date } },
    ],
  });
  return bookedIds;
}

module.exports = { getHomeStay, createHomestays, getHomestayById };
