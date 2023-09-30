import express from "express"
import colors from "colors";
import dotenv from "dotenv";
import expressEjsLayouts from "express-ejs-layouts";
import productRoute from "./router/product.js"

dotenv.config();

//express init
const app = express();

//port
const PORT = 6060;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//ejs
app.set("view engine","ejs")
app.use(expressEjsLayouts)

//static folder
app.use(express.static("public"))

// all route
app.use(productRoute)


//server

app.listen(PORT, () =>{
    console.log(`server is running on PORT ${PORT}`.bgGreen);
})
