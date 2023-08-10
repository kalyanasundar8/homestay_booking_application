//? NPM packages
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();

//? Routes
const userRoutes = require("./Routes/UserRoutes.js");
const homestayRouter = require("./Routes/HomestayRoute.js");
const bookingRouter = require("./Routes/BookingRoutes.js");
const connectToDb = require("./utils/ConnectToDb.js");

//? Db connection
connectToDb();

//? Get a Port number
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/homestay", homestayRouter);
app.use("/api/booking", bookingRouter);

app.listen(port, () => {
  console.log(`App listening port: http://localhost:${port}`.cyan);
});
