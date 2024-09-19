import mongoose from "mongoose";
import {genSalt,hash} from 'bcrypt'


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
   const salt=await genSalt()
   this.password=await hash(this.password,salt)
   next()
})

const User=mongoose.model('Users',userSchema)
export default User;