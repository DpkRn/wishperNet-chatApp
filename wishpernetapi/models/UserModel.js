import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
       
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    image:{
        type:String,
        required:false,
    },
    color:{
        type:Number,
        required:false,
    },
    profileSetup:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})

userSchema.pre('save',async function (next){
   
   this.password=await bcryptjs.hash(this.password,10)
   next()
})

const User=mongoose.model('Users',userSchema)
export default User;