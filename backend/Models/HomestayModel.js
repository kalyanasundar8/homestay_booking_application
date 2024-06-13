import mongoose from "mongoose";

const homestaySchema = mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    },
    name: {
      type: String,
      required: "true",
    },
    location: {
      type: String,
      required: "true",
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HomeStay = mongoose.model("homestay", homestaySchema);
export default HomeStay;