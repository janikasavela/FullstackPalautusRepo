const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.send(users);
});

router.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "Username and password should both be more than 2 characters long",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "expected `username` to be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).send(savedUser);
});

module.exports = router;
