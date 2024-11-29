import express from "express";
import userModel from "../models/userModel.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const googleAuthRouter = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

googleAuthRouter.post("/google", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token is required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    let user = await userModel.findOne({ email });
    if (!user) {
      user = new userModel({ name, email });
      await user.save();
    }

    const jwtToken = createToken(user._id);
    res.status(200).json({ success: true, token: jwtToken });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
});

export default googleAuthRouter;
