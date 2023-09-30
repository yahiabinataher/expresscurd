
import { log } from "console"
import { createSlug, randomId } from "../helpers/helpers.js"
import nodemailer from "nodemailer"
import fs from "fs"


//get all  product data
export const getAllProduct = (req,res) =>{
   const productData= JSON.parse(fs.readFileSync("db/product.json","utf8"))
   if(productData.length === 0){
      res.status(404).json({message: "Product data is not found"})
      return
   }
res.status(200).json(productData)
}
//get singel product

export const getSingelProduct = (req,res) =>{
   const {slug}= req.params;
   const productData= JSON.parse(fs.readFileSync("db/product.json","utf8"))
    const singelData = productData.find((data) => data.slug === slug)
    if(!singelData){
      res.status(404).json({message: "Singel product not found"})}
   
    res.status(200).json(singelData)
}

//createProduct
export const createProduct = (req,res) =>{
   const{name,email,regularPrice,salePrice,stock} = req.body;
   //validation
   if(!name || !regularPrice){
      res.status(400).json({message: "Name and RegularPrice shot not ematy"})
      return;
   }
   const productData= JSON.parse(fs.readFileSync("db/product.json","utf8"))
   //validation of similar product
   if(productData.some((data) => data.slug === createSlug(name))){
      res.status(404).json({message: "Similar product name of data already create"})
      return;
   }
   const product = {
      id: randomId(),
      name,
      email,
      slug: createSlug(name),
      regularPrice,
      salePrice,
      stock,
      productphoto: req.file.filename
   }
   //send mail
   // const transpoter = nodemailer.createTransport({
   //    host:"smtp.google.com",
   //    port:587,
   //    auth:{
   //       user:"yahiabinataher@gmail.com",
   //       pass:"tzaq mkpa tbif nggs",
   //    },
   // })
   // transpoter.sendMail({
   //    from: "mail test <yahiabinataher@gmail.com>",
   //    subject:"just chack",
   //    to: email,
   //    text:" hi yahia are you happy"
   // })

   productData.push(product)
   fs.writeFileSync("db/product.json",JSON.stringify(productData))
   res.redirect("/")
}

//delete product data
export const deleteProduct = (req,res) =>{
   const {id} = req.params
   const productData= JSON.parse(fs.readFileSync("db/product.json","utf8"))
   const updateData = productData.filter((data) => data.id !== id)
   fs.writeFileSync("db/product.json",JSON.stringify(updateData))

res.redirect("/")
}


//show all product page
export const showProductPage = (req,res) =>{
   const productData= JSON.parse(fs.readFileSync("db/product.json","utf8"))

res.render("products",{products: productData})
}
//create product page
export const createProductPage = (req,res) =>{

res.render("create")
}
//singel product page
export const singelProductPage = (req,res) =>{
   const {slug} = req.params
   const productData= JSON.parse(fs.readFileSync("db/product.json","utf8"))
   const singleProduct = productData.find((data) => data.slug === slug)
   res.render("singel",{product: singleProduct})
   }
//editproduct page
export const editProductPage = (req,res) =>{
   const {id} = req.params;
   const productData= JSON.parse(fs.readFileSync("db/product.json","utf8"))
   const editProduct = productData.find((data) => data.id === id)
   res.render("edit",{product: editProduct})
   }
   //update product
export const updateProduct = (req,res) =>{
   const {id} = req.params;
   const{name,regularPrice,salePrice,stock} = req.body;
   const productData= JSON.parse(fs.readFileSync("db/product.json","utf8"))
   let photo = productData[productData.findIndex((data) => data.id === id)].productphoto;
   if(req?.file?.filename){
      photo = req.file.filename;
      
   }



   productData[productData.findIndex((data) => data.id === id)] = {
      id: id,
      name,
      slug: createSlug(name),
      regularPrice,
      salePrice,
      stock,
      productphoto:photo
   }
   fs.writeFileSync("db/product.json",JSON.stringify(productData))
   res.redirect("/")
   }