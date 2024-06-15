//? NPM packages
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import cors from "cors";
import parser from "body-parser";

//? Routes
import userRouter from "./Routes/UserRoutes.js";
import homestayRouter from "./Routes/HomestayRoute.js";
import bookingRouter from "./Routes/BookingRoutes.js";
import connectToDb from "./utils/ConnectToDb.js";
import adminRouter from "./Routes/AdminRoutes.js";
import mongoose from "mongoose";

//? Db connection
connectToDb();

//? Get a Port number
const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

mongoose.set('strictPopulate', false);

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/homestay", homestayRouter);
app.use("/api/booking", bookingRouter);

app.listen(port, () => {
  console.log(`App listening port: http://localhost:${port}`.cyan);
});
