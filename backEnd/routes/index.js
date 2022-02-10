const userRoute = require("../routes/users");
const postRoute = require("../routes/post");

module.exports = (app) => {
  app.use("/groupomania", userRoute);
  app.use("/groupomania", postRoute);
};
