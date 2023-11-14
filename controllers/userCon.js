
import user from "../models/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import asyncHandler from "express-async-handler";
/**
 * @DESC GET ALL USER
 * @ROUTE /api/v1/user
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getAllUser = asyncHandler(async(req,res) =>{
    //get all user
    const data = await user.find().populate("books")
    //chaking data 
    if(data.length === 0 ){
       return  res.status(404).json({message: "User data is not found", user: data})
    }
    res.status(200).json({message: "", user: data})
})
/**
 * @DESC GET SINGEL  USER
 * @ROUTE /api/v1/user:id
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getSingelUser =asyncHandler( async(req,res) =>{
    const {id}= req.params
    //get singel user
    const data = await user.findById(id)
    //chaking data 
    if(!data){
        res.status(404).json({message: "user data not found", user: null})
    }
    res.status(200).json({message: "", user: data})
})
/**
 * @DESC DELETE SINGEL  USER
 * @ROUTE /api/v1/user:id
 * @METHOD DELETE
 * @ACCESS PUBLIC
 */
export const deleteUser = asyncHandler(async(req,res) =>{
    const {id}= req.params
    //get singel user
    const data = await user.findByIdAndDelete(id)
    //chaking data 
    if(!data){
        res.status(404).json({message: "user data not found", user: null})
    }
    res.status(200).json({message: "Data is Deleted", user: data})
})
/**
 * @DESC CREATE  USER
 * @ROUTE /api/v1/user
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const createUser = asyncHandler(async(req,res) =>{
    const {name,email,password,books} = req.body
    //validation
    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }
     const passwordHash = await bcrypt.hash(password,10)
    const data = await user.create({name,email, password: passwordHash,books})
    //create jwt
    const token = jsonwebtoken.sign({name,email},process.env.JWC_SEC,{
        expiresIn:"15m"
    })
   
    
    res.status(200).json({message: "user data is created successful", user: data,token})
})
/**
 * @DESC UPDATE USER
 * @ROUTE /api/v1/user
 * @METHOD PUT/PATCH
 * @ACCESS PUBLIC
 */
export const updateUser = asyncHandler(async(req,res) =>{
    const {id} = req.params
    const {name,email} = req.body
    //validation
    if(!name || !email){
        return res.status(400).json({message: "All fields are required"})
    }
//update user
    const data = await user.findByIdAndUpdate(id,{name,email},{new:true});
    res.status(200).json({message: "user data update successful", user: data})
})
