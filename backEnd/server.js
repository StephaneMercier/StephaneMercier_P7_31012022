// the package "cors" provides Express middleware to enable CORS with various options
const cors = require("cors");
const express = require("express");
const app = express();
require("./routes/users");
const db = require("./models");
db.sequelize.sync();

var corsOptions = {
  origin: "https://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Connected to Groupomania App" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
