// The "Post" variable will be needed to delete the post on cascade when deleting the User
const { User, Post } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signing up for new profile
exports.signUp = async (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const admin = req.body.isAdmin;
  const regexMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexPwd =
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
  try {
    //   Throw error for missing fields
    if (!email || !password || !name || !lastName) {
      throw new Error("Please fill all fields required");
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
    // Check if the User is already registered (via email)...
    const isUser = await User.findOne({
      attributes: ["email"],
      where: { email },
    });
    if (isUser) {
      throw new Error("This account already exists");
    }

    // ...if not create the User
    const newUser = await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      name,
      lastName,
      admin,
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
      throw new Error("Account not found, please Sign in first");
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

// Get User profile
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userFound = await User.findOne({ where: { id } });
    res.status(200).json({ userFound });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// get All Users profiles
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    // Send HTTP response of all users datas
    res.json(users);
    // console.log(users);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Update User profile
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    // Throw error if profile is not found
    if (!user) {
      throw new Error("Profile not found");
    }
    const userToUpdate = await User.update(
      {
        name: req.body.name,
        last_name: req.body.lastName,
      },
      { where: { id } }
    );
    if (!userToUpdate) {
      throw new Error("Unable to update this profile");
    }
    res
      .status(200)
      .json({ user: userToUpdate.isAdmin, message: "Profile updated" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Delete User profile
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    //   Delete Post(s) along with User profile
    const deletePost = await Post.destroy({ where: { id: id } });
    if (!deletePost) {
      throw new Error("No post(s) related to this User");
    }
    res
      .status(200)
      .json({ message: "All posts related to this profile have been deleted" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
  try {
    await User.destroy({ where: { id: id } });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
  res.status(200).json({ message: "Succesfully deleted this account" });
};
