const express = require("express");
const connect = require("./config/db");

const app = express();
app.use(express.json());

const usersController = require("./controllers/user.controller");

app.use("/users", usersController);

const start = async () => {
    await connect();

    app.listen(2244, async () => {
        console.log("Listening at port 2244...");
    });
};

module.exports = start;
