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

    res.cookie('jwt',token,{
      httpOnly:true,
      maxAge:24*60*60*1000
    })
      res.status(200)
        .json({
          _id: userExists._id,
          firstName: userExists.firstName,
          lastName: userExists.lastName,
          email: userExists.email,
          
        });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};


export const getUserProfile = async(req,res)=>{
  try{
    const user = await User.findById(req.userId)
    if(!user){
      return res.status(404).json({message:'User not found'})
    }
    res.json({
      _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
    })
  }catch(err){
      return res.status(500).json({message:'Server error'})
  }
}

export const logoutUser = async(req,res)=>{
    res.clearCookie('jwt')
    return res.status(200).json({message:"Logged out successfully"})
}