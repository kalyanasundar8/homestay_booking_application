import mongoose from "mongoose";

const homestaySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Please enter a name"],
    },
    location: {
      type: String,
      required: ["true", "Please enter a location"],
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