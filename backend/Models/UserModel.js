import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Please enter your name"],
    },
    email: {
      type: String,
      required: ["true", "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: ["true", "Please enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
export default User;