
import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";
import { createSlug } from "../helpers/helpers.js";


export const createBook = asyncHandler(async (req,res) =>{
    const {name} = req.body;
    const books = await  Book.create({name, slug:createSlug(name)})
    res.status(200).json({meassage:"data is sucesful created",books})

})
