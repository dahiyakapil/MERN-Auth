import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeMail } from "../mailtrap/email.js";
import { use } from "bcrypt/promises.js";

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required"); // Fixed typo
    }

    const userAlreadyExists = await User.findOne({ email }); // Added await

    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10); // Added await
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Fixed typo and improved random token generation

    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken, // Fixed typo
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // JWT verification email for verifying the account
    generateTokenAndSetCookie(res, user._id);

    // verification email
    const a = await sendVerificationEmail(user.email, verificationToken);
    console.log(a);

    res.status(201).json({
      success: true,
      message: "User created successfully", // Fixed typo
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "User is not created",
    });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  console.log(code);

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // if user is found
    user.isVarified = true; // isVerified is in mongoDB model
    (user.verificationToken = undefined),
      (user.verificationTokenExpiresAt = undefined);
    await user.save();

    // sending a welcome mail to user
    await sendWelcomeMail(user.email, user.name);

    // return a response
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifying the email", error);
    res
      .status(500)
      .json({ success: false, message: "Error in verifying the email" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // comparring the user password send and our db password
    const isPasswordValid = bcrypt.compare(password, user.password);
    console.log(password + " -----> ", +user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Password not matched" });
    }

    // generating cookies for the user
    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in logging", error);
    res.status(401).json({
      success: false,
      message: "Error in logging"
    })
  }
};

export { signup, verifyEmail, login, logout };
