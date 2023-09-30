import path from "path"
import multer from "multer";
//storage setup

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        if(file.fieldname ==="image"){
            cb(null, "public/customer")
        }else if(file.fieldname ==="img"){
            cb(null, "public/staff")
        }else if(file.fieldname ==="images"){
            cb(null, "public/student")
        }else if(file.fieldname ==="userPhoto"){
            cb(null, "public/user")
        }else if(file.fieldname ==="userCv"){
            cb(null, "public/cv")
        }else if(file.fieldname === "productphoto"){
            cb(null, "public/products")
        }
    },
    filename : (req,file,cb) =>{
        const fileExt= path.extname(file.originalname);
        const fileName= file.originalname
                        .replace(fileExt,"")
                        .toLowerCase()
                        .split(" ")
                        .join("-")+ "-" + Date.now() + "-" + Math.round(Math.random() * 10000)
        cb(null,fileName+fileExt)
    }
})

export const customerMulterMiddlewars = multer({storage,

fileFilter: (req,file,cb) =>{
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" 
    ){
        cb(null,true)
    }else{
        cb(new Error("Only. jpeg. jpg. and png format allowed!"))
    }
},
limits:{
    fileSize: 1000000
}
}).single("image");
export const staffMulterMiddlewars = multer({storage}).single("img");
export const studentMulterMiddlewars = multer({storage}).single("images");
export const userMulterMiddlewars = multer({storage}).fields([
    {name : "userPhoto",
    maxCount: 1},
    {
        name: "userCv",
        maxCount:2
    },
]);
export const productMulterMiddlewars = multer({storage}).single("productphoto");