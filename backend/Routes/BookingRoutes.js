import express from "express";
import { createHomeBooking } from "../controller/BookingHomeController.js";

const bookingRouter = express.Router();

bookingRouter.post("/booking-home", createHomeBooking);

export default bookingRouter;
