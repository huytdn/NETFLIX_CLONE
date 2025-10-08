import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper: Tạo JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Đăng ký
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const emailExist = await User.findOne({ email });
    if (emailExist)
      return res.status(400).json({ message: "User already exists." });

    const usernameExist = await User.findOne({ username });
    if (usernameExist)
      return res
        .status(400)
        .json({ message: "Username is taken, try another one." });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userDoc = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(userDoc._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ user: userDoc, message: "User created successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc)
      return res.status(400).json({ message: "Invalid credentials." });

    const isPasswordValid = await bcryptjs.compare(password, userDoc.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = generateToken(userDoc._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ user: userDoc, message: "Logged in successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy user đang đăng nhập
export const fetchUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đăng xuất
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully." });
};
