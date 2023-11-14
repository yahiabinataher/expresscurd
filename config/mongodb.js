
import mongoose from "mongoose";
export const mongodbConnections = async () =>{
 try {
 const connected = await mongoose.connect("mongodb+srv://yahiabinataher:yahia636456@cluster0.iep172n.mongodb.net/instagram?retryWrites=true&w=majority");
 console.log(`mongoDB connected successful`.bgMagenta);
 } catch (error) {
    console.log(`mongoDB connected unsuccessful`.bgRed);
 }
}
