require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  await User.deleteMany();

  await User.insertMany([
    {
      username: "admin",
      password: "admin123",
      role: "admin"
    },
    {
      username: "student",
      password: "student123",
      role: "student"
    }
  ]);

  console.log("Users Added");

  process.exit();
});