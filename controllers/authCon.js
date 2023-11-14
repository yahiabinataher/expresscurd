import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import user from "../models/User.js";


export const loginUser = asyncHandler(async (req,res) =>{
    const {email,password} = req.body;
    //validation
    if(!email || !password){
       return res.status(400).json({meassage:"All fields are required"})
    }
    const loginUser = await user.findOne({email})
    // email check
    if(!loginUser){
        return res.status(200).json({message:"invalid email address"})
    }
    //password check
    const passchack = await bcrypt.compare(password,loginUser.password)
    if(!passchack){
        return res.status(200).json({message:"Wrong password"})
    }
    //access token
    const token = jsonwebtoken.sign({email:loginUser.email},process.env.JWC_SEC,{
        expiresIn:"7d"
    })
    //cooke
    res.cookie("accesToken",token,{
        httpOnly:true,
        secure:process.env.APP_ENV ==="Development"? false : true,
        sameSite:"strict",
        path:"/",
        maxAge:7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({meassage:`hello ${loginUser.name}, you are sucessfuli login`, user:loginUser,token})
})

//logout
export const logoutUser = asyncHandler(async (req,res) =>{
 
    //cooke
    res.clearCookie("accesToken")
    res.status(200).json({meassage:"you are now logout"})
})