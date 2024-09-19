import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import path from 'path'
import fs from 'fs'
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};
export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(409).send("Email already exist !");
    }
    const user = await User.create({ email, password });
    console.log(createToken(email, user.id));
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server internal error", error: error });
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("user not found!");
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(401).send("Invalid password !");
    }
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color,
        image: user.image,
      },
    });
  } catch (error) {
    return res.status(500).send("Server Internal error");
  }
};
export const getuserinfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send("user not found");
    }
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color,
        image: user.image,
      },
    });
  } catch (error) {
    return res.status(500).send("Server Internal error");
  }
};
export const updateprofile = async (req, res, next) => {
  try {
    
    const {firstName,lastName,color}=req.body;
    const user = await User.findByIdAndUpdate(req.userId,{firstName,lastName,color,profileSetup:true},{new:true,runValidators:true});
    if (!user) {
      return res.status(404).send("user not found");
    }
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color,
       image: user.image,
      },
    });
  } catch (error) {
    return res.status(500).send("Server Internal error");
  }
};

export const addprofileimage = async (req, res, next) => {
  try {
    if(!req.file){
      return res.status(400).send("file is required !")
    }
    
    const date=Date.now()
    let fileName="uploads/profiles/"+date+req.file.originalname;
    
    fs.renameSync(req.file.path,fileName)
    console.log(req.file)
    
    const updatedUser=await User.findByIdAndUpdate(req.userId,{image:fileName},{new:true,runValidators:true})
    if(!updatedUser)
      res.status(404).send('error occurred ! try again')
    res.status(200).json({
      image:updatedUser.image
    })
  } catch (error) {
    return res.status(500).send("Server Internal error while uploading profile image");
  }
};
export const removeprofileimage = async (req, res, next) => {
  try {
   const user=await User.findById(req.userId)
   if(!user){
    return res.status(404).send("user not found !")
   }
   if(user){
    fs.unlinkSync(user.image)
    user.image=null
   }
   await user.save();
   return res.status(200).send("profile picture deleted successfully !")
  } catch (error) {
    return res.status(500).send("Server Internal error while uploading profile image");
  }
};
export const logout=async (req,res,next)=>{
  try{
    res.cookie('jwt','',{maxAge:1,secure:true,sameSite:'None'})
    res.status(200).send("logout successfull")
  }catch(err){
    res.status(500).send("Server internal error")
  }
}
  
