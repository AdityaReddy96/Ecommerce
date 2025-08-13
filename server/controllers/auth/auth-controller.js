import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
import { config } from "dotenv";

config({ path: "./.env" });

// User Registration and Saving into database.
const registerUser = async (req, res) => {
  // console.log(req.body);
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        success: false,
        message: "User Already Exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log(hashedPassword);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration Successfull.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured in registerUser.",
    });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.json({
        success: false,
        message: "Please register yourself.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid password, Please try again.",
      });
    }

    // Token Generation
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Assigning token to cookie in browser
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 1000, // 1 hour
        path: "/",
      })
      .json({
        success: true,
        message: "Logged In Successfully",
        user: {
          id: checkUser._id,
          role: checkUser.role,
          email: checkUser.email,
          userName: checkUser.userName,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured in loginUser",
    });
  }
};

// Logout
const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    })
    .json({
      success: true,
      message: "Logged out succcessfully",
    });
};

// Auth Middleware (Verifying user at each route)
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is not present, Unauthorized user",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error Occurred in authMiddleware",
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };
