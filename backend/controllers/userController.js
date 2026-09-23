import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const newUser = await User.create(req.body);
    res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    const isMatch = await bcrypt.compare(password, userExists.password);

    if (isMatch) {
      const token = jwt.sign({ userId: userExists._id }, "mySecretKey", {
        expiresIn: "1d",
      });
      res
        .status(200)
        .json({
          _id: userExists._id,
          firstName: userExists.firstName,
          lastName: userExists.lastName,
          email: userExists.email,
          token,
        });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};
