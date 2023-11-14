import jsonwebtoken from "jsonwebtoken"
import asyncHandler from "express-async-handler";


export const verify = (req,res,next) =>{
 //chack cookis
const accesToken = req.cookies.accesToken;

//chack token
if(!accesToken){
    return res.status(401).json({message:"unauthoresUser"})
}
//token verify
 jsonwebtoken.verify(accesToken,process.env.JWC_SEC, asyncHandler(async(error,decode) =>{
    if(error){
   return res.status(400).json({message:"invalid token"})
    }
    next()
    }))

}