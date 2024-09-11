import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
   const token = jwt.sign({userId}, process.env.JWT_SECRET,  {
        expiresIn: "7d"
    })

    res.cookie("token", token, {
        httpOnly:true, // only from the backend it will be handle no one on frontend can use this and can be updated only from backend, attacks - XSS
        secure: true,
        sameSite: "strict", // prevents from csrf attack
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15days
    })
}