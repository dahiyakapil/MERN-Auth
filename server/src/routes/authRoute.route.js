import express from "express";
import { signup, login, logout, verifyEmail } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);

// verify email
router.route("/verify-email").post(verifyEmail);

export default router;
