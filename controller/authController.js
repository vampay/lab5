const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Corrected from Product to User
require('dotenv').config();

// Register
exports.register = async (req, res) => {
    const { username, password,name,role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword ,name,role});
        await user.save();
        res.status(201).send("User registered");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Login  
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("User not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SELECT,
            { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SELECT
        );
        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Refresh
exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("access หมดอายุ")//เช็คว่าaccess หมดอายุมั้ย
        const accessToken = jwt.sign(
            { userId: user.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.json({ accessToken });
    });
};
