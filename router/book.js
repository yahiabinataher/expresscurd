import express from "express"
import { createBook } from "../controllers/bookCon.js"


const router = express.Router();



router.post("/book",createBook)


export default router