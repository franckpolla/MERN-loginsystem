const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
var nodemailer = require("nodemailer");
dotenv.config();

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email)
    return res.status(400).send("Missing fields");
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json({ status: true, message: "Sign up successful" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) return res.status(400).send("Missing fields");

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json({ message: "User not register" });
  } else {
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.json({ message: "Password!  is incorrect!" });
    } else {
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true, maxAge: 300000 });
      return res.json({ status: true, message: "login succesfully" });
    }
  }
});

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Email does not exist!");

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "fpolla640@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Click the following link to reset your password: http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        return res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.findByIdAndUpdate(id, {
      password: hashPassword,
    });

    return res.json({ status: true, message: "Password updated " });
  } catch (error) {
    console.log(error.message);
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error(error.message);
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Logged out successfully!" });
});

module.exports = router;
