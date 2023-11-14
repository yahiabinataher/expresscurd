import express from "express"
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.js";
import authRouter from "./router/auth.js";
import BookRouter from "./router/book.js"
import { mongodbConnections } from "./config/mongodb.js";
import { errorHandler } from "./middleware/errorHandalar.js";

dotenv.config();

//express init
const app = express();

//port
const PORT = 6060;
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

//static folder
app.use(express.static("public"))
// all route

app.use( "/api/v1/user",userRouter)
app.use("/api/v1",authRouter)
app.use(BookRouter)

//error handaler
app.use(errorHandler)

//server
app.listen(PORT, () =>{
    mongodbConnections()
    console.log(`server is running on PORT ${PORT}`.bgGreen);
})
