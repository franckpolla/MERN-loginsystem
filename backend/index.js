const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("../backend/route/User");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", router);
mongoose.connect("mongodb://localhost:27017/authentication");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
