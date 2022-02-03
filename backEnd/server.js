const cors = require("cors");
const express = require("express");
const app = express();
require("./routes/user");

var corsOptions = {
  origin: "https://localhost:8080",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.json({ message: "Connected to Groupomania App" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
