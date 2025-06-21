import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";

// register
const registerUser = async (req, res) => {
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
      message: "Internal Server Error.",
    });
  }
};

// login

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

    const checkPasswordMatch = bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid password, Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged In Successfully",
      user: {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
    });
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

export { registerUser, loginUser };
