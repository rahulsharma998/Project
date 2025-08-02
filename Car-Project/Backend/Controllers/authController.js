import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
  try{
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email})
    if(existingUser) return res.status(400).json({message:"User Already Exist"});
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({name,email,password:hashedPassword});
    await newUser.save();
    res.status(201).json({message:"User Registered Successfully"});
  } catch(error){
    res.status(500).json({message:"Server error"});
  }
};

export const Login=async (req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user) return res.status(400).json({message:"User not found"});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({message:"Invalid Credential"});
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.json({token,user});
  }catch(error){
    res.status(500).json({message:"Server Error"});
  }
};