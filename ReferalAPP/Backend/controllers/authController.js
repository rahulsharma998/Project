const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
exports.Login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if (!user) return res.status(400).json({message:"User not Found"});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid Credentials"});

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.json({token});
    } catch (err) {
        res.status(500).json({message:"server error"});
    }
};