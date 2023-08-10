const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    homestayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "homestay",
      required: true,
    },
    check_in_date: {
      type: Date,
      required: true,
    },
    check_out_date: {
      type: Date,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("booking", bookingSchema);
