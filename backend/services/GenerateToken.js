import jwt from "jsonwebtoken";

//! Generate authentication token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
  };