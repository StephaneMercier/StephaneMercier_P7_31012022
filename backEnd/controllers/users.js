const { User, Post } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Singing up for new profile
exports.signUp = async (req, res, next) => {
  const name = req.params.name;
  const lastName = req.params.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const regexMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPwd =
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
  try {
    //   Throw error for missing fields
    if (!email && !password && !name && !lastName) {
      throw new Error("Please fill all fields");
    }
    // Throw error for failed email regex
    if (!regexMail.test(email)) {
      throw new Error("E-mail format not valid");
    }
    // Throw error if regexPwd fails
    if (!regexPwd.test(password)) {
      throw new Error(
        "Password format not valid (Must contain at least: 1 Capital, 1 number and 1 special character"
      );
    }
    // Check if the User is already registered (via email)
    const isUser = await User.findOne({
      attributes: ["email"],
      where: { email },
    });
    if (isUser) {
      throw new Error("This account already exists");
    }

    const newUser = await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      name,
      lastName,
    });
    if (!newUser) {
      throw new Error("An error occured when creating your profile");
    }
    // Get token
    const jwtoken =
      "Bearer" +
      jwt.sign(
        {
          id: newUser.id,
        },
        "JSON_TOKEN",
        { expiresIn: "48H" }
      );
    if (!jwtoken) {
      throw new Error("Invalid token");
    }
    res.status(201).json({ message: "Profile created succesfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// User Login
exports.logIn = async (req, res, next) => {
  try {
    const password = req.body.password;
    const email = req.body.email;
    const user = await User.findOne({ where: { email } });

    // Thorw error if User is not signed up
    if (!user) {
      throw new Error("Account not found, please Sign Up");
    }

    const validPwd = await bcrypt.compare(password, user.password);

    // Throw error if Password check fails
    if (!validPwd) {
      throw new Error("Invalid Password");
    }

    const tokenConnect = jwt.sign({ id: user.id }, process.env.JSON_TOKEN, {
      expiresIn: "48H",
    });

    // Throw error if Token is not distributed
    if (!tokenConnect) {
      throw new Error("Token not distributed");
    }

    res.status(200).json({
      id: user.id,
      tokenConnect,
      admin: user.isAdmin,
      name: user.name,
      lastName: user.lastName,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
