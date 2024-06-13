import asyncHandler from "express-async-handler";
import Homestay from "../Models/HomestayModel.js";
import Booking from "../Models/BookingModel.js";
import Admin from "../Models/AdminModel.js";

//! [ Create homestays, GET/api/homestay/create_homestays ]
const createHomestays = asyncHandler(async (req, res) => {
  //? Destructure a homestays model
  const adminId = req.query.id;
  const { name, location, description, price } = req.body;

  //? Check all fields
  if (!name || !location || !description || !price) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //? Create a homestays
  const homestays = await Homestay.create({
    adminId,
    name,
    location,
    description,
    price,
  });

  //? check the homestay details
  if (homestays) {
    await Admin.findByIdAndUpdate(adminId, { $push: { rooms: homestays._id }});
    res.status(200).json({
      id: homestays.id,
      adminId: homestays.adminId,
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

//! [ Get homestays, GET/api/homestay ]
const getHomestayById = asyncHandler(async (req, res) => {
  const homestayId = req.query.id;

  // Fetch the homestay by ID
  try {
    const homestay = await Homestay.findById(homestayId);
    if (homestay) {
      res.json(homestay);
    } else {
      res.status(400).json({ error: "Homestay not found" });
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

export { getHomeStay, createHomestays, getHomestayById };
