const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
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
  } catch (error) {
    console.erro(error.message);
  }
});

module.exports = router;
