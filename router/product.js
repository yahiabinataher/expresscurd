import express from "express"
import { createProduct, createProductPage, deleteProduct, editProductPage, getAllProduct, getSingelProduct, showProductPage, singelProductPage, updateProduct,} from "../controllers/productCon.js"
import { productMulterMiddlewars } from "../utils/multer.js"

//init route
const route = express.Router()

//ejs route
route.get("/",showProductPage)
route.get("/create",createProductPage)
route.get("/singel/:slug",singelProductPage)
route.get("/edit/:id",editProductPage)
route.post("/update/:id",productMulterMiddlewars, updateProduct)

//all route
route.get("/product",getAllProduct)
route.get("/product/:slug",getSingelProduct)
route.get("/product-delete/:id",deleteProduct)
route.post("/product",productMulterMiddlewars,createProduct)


export default route 