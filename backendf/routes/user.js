const express = require("express");
const router = express.Router();
const User = require("../Schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const { isLoggedIn } = require("../middleware/auth");

env.config();

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { email, password, name, phone, addresses } = req.body; // Include addresses from the request body

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            res.status(400).json({ message: "Email already taken" });
            return;
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await new User({
            email,
            password: hashedPassword,
            name,
            phone,
            addresses: addresses || [], // Initialize addresses if provided, else set to empty array
        }).save();

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.status(200).json({
            message: "User created successfully",
            token,
            id: newUser._id,
            name: newUser.name,
            addresses: newUser.addresses, // Return the user's addresses
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Signin Route
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.status(200).json({
            message: "Login successful",
            token,
            id: user._id,
            name: user.name,
            addresses: user.addresses, // Return the user's addresses
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
