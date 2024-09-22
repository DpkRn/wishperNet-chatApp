import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
 import {v2 as cloudinary} from 'cloudinary';
 import { getImagePublicId } from "../utils/imageUploader.js";
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
    const { image } = req.body;

    // Log to check if image exists
    if (!image) {
      console.log("File not found");
      return res.status(400).send("File is required!");
    }

    console.log("Uploading image to Cloudinary...");
    const result = await cloudinary.uploader.upload(image, {
      folder: 'profile_images', 
    });

  const imgUrl = result.secure_url;
  const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: imgUrl },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found. Try again.');
    }
    // Send response
    res.status(200).json({
      image: updatedUser.image
    });
  } catch (error) {
    console.error("Error during Cloudinary upload:", error);
    next(error);  // Pass the error to error-handling middleware
  }
};

 export const removeprofileimage = async (req, res, next) => {
 
 const {userId}=req
  

  if (!userId) {
    return res.status(400).send('public_id is required to delete the image');
  }

  try {
    const updated=await User.findByIdAndUpdate(userId,{
        image:null
    })
  
    if(updated){
      const public_id=getImagePublicId(updated.image)
      const result = await cloudinary.uploader.destroy(public_id); 
      if (result.result === 'ok') {
        res.status(200).send('Image deleted successfully');
      } else {
        res.status(404).send('Image not found or already deleted');
      }
    }
   
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).send("Error deleting image");
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
  
