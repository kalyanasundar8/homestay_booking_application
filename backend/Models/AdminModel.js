import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "HomeStay" }],
    bookingList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking"}]
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);
export default Admin;
