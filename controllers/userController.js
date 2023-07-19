const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(404);
        throw new Error("Missing Required Fields");
    }
    else {
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered");
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("hashed password", hashedPassword);
            const registeredUser = await User.create({
                username,
                email,
                password: hashedPassword
            })
            if (registeredUser) {
                res.status(201).send(registeredUser);
            }
            else {
                res.status(400);
                throw new Error("User Not Registered");
            }
        }
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {    
        res.status(404);
        throw new Error("All fields are mandatory!");
    }
    else {
        console.log("email", email);
        const user = await User.findOne({email});
        console.log("user", user);
        if(user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                 }
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"100m"})
            res.status(200).json({accessToken})
        }
        else {
            res.status(400);
            throw new Error("User does not exist");
        }
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = { registerUser, loginUser, getCurrentUser }