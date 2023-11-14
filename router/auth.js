import express from "express"
import { loginUser,logoutUser } from "../controllers/authCon.js";


//init route
const router = express.Router();

//book route

router.post("/login",loginUser)
router.get("/logout",logoutUser)


export default router