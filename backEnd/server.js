// the package "cors" provides Express middleware to enable CORS with various options
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routes");
var corsOptions = {
  AccessControlAllowOrigin: "*",
  // origin: "https://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Connected to Groupomania App" });
});

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
