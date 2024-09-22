import { Router } from "express";
import { getuserinfo, login, signup,updateprofile,addprofileimage,removeprofileimage, logout } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";


const route=Router()


route.post('/signup',signup)
route.post('/login',login)
route.get('/userinfo',verifyToken,getuserinfo)
route.post('/update-profile',verifyToken,updateprofile)
route.post(
    '/add-profile-image',
    verifyToken,
    addprofileimage
)

route.delete('/remove-profile-image',verifyToken,removeprofileimage)
route.post('/logout',logout)

export default route