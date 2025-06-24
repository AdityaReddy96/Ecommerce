import mongoose from "mongoose";

// User Schema Definition
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

// User Model Creation  
const User = mongoose.model("User", UserSchema);
export { User };
