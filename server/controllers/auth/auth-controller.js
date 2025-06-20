import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";

// register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// login

const loginUser = () => {
  const { userName, email } = req.body;

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// logout

const logout = () => {
  const { username, email } = req.body;

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// auth middleware

export { registerUser };
