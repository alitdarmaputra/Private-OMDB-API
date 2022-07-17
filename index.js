const app = require("./server");
const User = require("./models/Users.js");
const sequelize = require("./util/database");

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("App is listening on port", port);
})