const express = require("express");
const createHomeBooking = require("../controller/BookingHomeController");

const router = express.Router();

router.post("/booking-home", createHomeBooking);

module.exports = router;
