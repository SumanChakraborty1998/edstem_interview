const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
};

router.get("/", async (req, res) => {
    const users = await User.find().lean().exec();
    return res.status(200).json({ data: users });
});

router.post("/signup", async (req, res) => {
    //Checks the user is already present or not
    let user = await User.findOne({ email: req.body.email }).exec();

    //If presents, return not possible to create the user
    if (user) {
        return res
            .status(400)
            .json({ status: "failed", message: "User already exists" });
    }

    //If not then create new user and store into the database
    user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).json({ data: { user, token } });
});

router.post("/login", async (req, res) => {
    //Checks the user is already present or not
    let user = await User.findOne({ email: req.body.email }).exec();

    //If not presents, return not possible to create the user
    if (!user) {
        return res
            .status(401)
            .json({ status: "failed", message: "User doesnot exists" });
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
        return res
            .status(401)
            .json({ status: "failed", message: "Credentials incorrect" });
    }

    const token = newToken(user);
    return res.status(201).json({ data: { user, token } });
});

module.exports = router;
