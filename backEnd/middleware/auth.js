const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token.token);
    const decodToken = jwt.verify(token, process.env.JSON_TOKEN);
    const userId = decodToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid User ID";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).send({ message: "Authentication failed" });
  }
};
