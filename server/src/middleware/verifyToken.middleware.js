import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Check if cookies object exists and if token is provided
  if (!req.cookies || !req.cookies.token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }

  const token = req.cookies.token;

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assign the decoded userId to the request object
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in verifyToken: ", error);
    // Check for specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Unauthorized - token expired" });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }

    return res.status(500).json({ success: false, message: "Server error" });
  }
};
