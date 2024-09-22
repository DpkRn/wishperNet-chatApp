import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages } from "../controllers/MessagesController.js";


const routes=Router()

routes.post('/get-messages',verifyToken,getMessages)



export default routes;