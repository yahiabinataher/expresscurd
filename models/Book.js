import mongoose from "mongoose"

const bookSchema = {
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type:Boolean,
        default:true
    }
}

export default mongoose.model("Book", bookSchema)