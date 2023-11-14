import express from "express"
import { createUser, deleteUser, getAllUser, getSingelUser, updateUser } from "../controllers/userCon.js";
import { verify } from "../middleware/verifyToken.js";

//init route
const router = express.Router();
router.use(verify)

//book route

router.get("/",getAllUser)
router.get("/:id",getSingelUser)
router.delete("/:id",deleteUser)
router.patch("/:id",updateUser)
router.post("/",createUser)

export default router