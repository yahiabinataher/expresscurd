import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name field is improtent"],
        trim:true
    },
    username:{
        type:String,
       // required:[true,"username field is improtent"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        required:true
    },
    books:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Book",
        default:[]
    },
    cell:{
        type:String,
        trim:true,
        default:null
    },
    age:{
        type:Number,
        min:18,
        max:55,
        default:null
    },
    location:{
        type:String,
        trim:true,
        default:null

    },
    gender:{
        type:String,
        trim:true,
        default:null
    },
    photo:{
        type:String,
        default:null
    },
    status:{
        type:Boolean,
        default:true
    },
    trash:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
})

export default mongoose.model("user",userSchema)