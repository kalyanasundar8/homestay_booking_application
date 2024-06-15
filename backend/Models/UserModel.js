import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
export default User;