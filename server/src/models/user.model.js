import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  //    email, password, name, lastLogin, isVarified, resetPasswordToken, resetPasswordExpiresAt, varificationToken, varificationTokenExpiresAt
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowerCase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVarified: {
      type: Date,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiresAt: {
      type: Date,
    },
    varificationToken: {
      type: String,
    },
    varificationTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);



