const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const path = require("path");
require("dotenv").config();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("api/post");
