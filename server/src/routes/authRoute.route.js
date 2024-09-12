import express from "express";
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";

const router = express.Router();

// route for frontend that will check if user is authenticated or not with the help of middleware

router.route("/check-auth", verifyToken).get(checkAuth);

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword)

// verify email
router.route("/verify-email").post(verifyEmail);

export default router;
