// Migration file
console.log("migration");
const db = require("./models");
db.sequelize.sync();
