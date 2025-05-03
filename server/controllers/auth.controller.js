import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
   try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await User.findOne({ email });

    if (exist) {
        return res.status(400).json({ message: "User already exists" });


    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({ userName, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user });
    
    
   } catch (error) {
    res.status(500).json({ message: "Internal server error" });
   }
    
}


export const login  = async (req, res) => {
    try {
        const {userName, password} = req.body
        if(!userName || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({userName})
        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const showUser = {
            userName: user.userName,
            email: user.email,
            followers: user.followers.length,
            following: user.following.length
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "10d"})
        return res.cookie("token", token, {httpOnly: true, sameSite:'strict',maxAge: 10*24*60*60*1000}).status(200).json({message: "Login successful", user: showUser, token})
        
    } catch (error) {
        console.log(error);
        
    }
}

export const logout = async (req, res) => {
    try {
        return res.cookie("token","",{maxAge:0}).status(200).json({message: "Logout successful"})
        
    } catch (error) {
        console.log(error);
        
    }
}