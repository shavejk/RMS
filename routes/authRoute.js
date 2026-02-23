const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

// register route
// post
router.post("/signup", async (req, res)=> {
    const {name, email, password} = req.body;
    try{
        if(!name || !email || !password ){
            return res.status(400).json({status:"N", message:"All fields are required"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ status: "N", message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({status:"Y", message:"User registered sucessfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({status:"N", error:`Internal server error: ${error}`});
    }
});

//login route
//post
router.post("/login", async (req, res)=> {
    const { email, password} = req.body;
    try{
        if( !email || !password ){
            return res.status(400).json({status:"N", message:"All fields are required"});
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser){
            return res.status(400).json({ status: "N", message: "Invalid email or password"});
        }
        const isvalidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isvalidPassword){
            return res.status(400).json({ status: "N", message: "Invalid email or password"});

        }
        const token = jwt.sign({userId: existingUser._id,email: existingUser.email,name:existingUser.name,},process.env.JWT_SECRET,{expiresIn:"1d"});

        return res.status(201).json({status:"Y", message:"Logined In sucessfully", token, user:{id: existingUser._id, name: existingUser.name, email: existingUser.email}});
    }catch(error){
        console.log(error);
        return res.status(500).json({status:"N", error:`Internal server error: ${error}`});
    }
});

module.exports = router;


