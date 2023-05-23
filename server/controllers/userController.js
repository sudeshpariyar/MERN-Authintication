import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (userDoc && (await userDoc.matchPassword(password))) {
    generateToken(res, userDoc._id);
    res.status(201).json({
      _id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email,
    });
  } else {
    res.status(401);
    throw new Error(`Invalid credentials.`);
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User ${email} already exists`);
  }
  const userDoc = await User.create({ name, email, password });

  if (userDoc) {
    generateToken(res, userDoc._id);
    res.status(201).json({
      _id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email,
    });
  } else {
    res.status(400);
    throw new Error(`Invalid data.`);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logout" });
});
const getUserProfile = asyncHandler(async (req, res) => {
  const userDoc = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(userDoc);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const userDoc = await User.findById(req.user._id);
  if (userDoc) {
    userDoc.name = req.body.name || userDoc.name;
    userDoc.email = req.body.email || userDoc.email;

    if (req.body.password) {
      userDoc.password = req.body.password;
    }
    const updatedUserDoc = await userDoc.save();
    res.status(200).json({
      _id: updatedUserDoc._id,
      name: updatedUserDoc.name,
      email: updatedUserDoc.email,
    });
  } else {
    res.status(404);
    throw new Error(`User not foune`);
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
