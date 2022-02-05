const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodToken = jwt.verify(token, process.env.JSON_TOKEN);
    const userId = decodToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "L'ID de l'utilisateur n'est pas valide";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).send({ message: "L'authentification a echouée" });
  }
};
