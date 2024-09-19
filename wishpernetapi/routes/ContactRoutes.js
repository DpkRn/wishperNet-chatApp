import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { searchContacts } from "../controllers/ContactsController.js";

const routes=Router()

routes.post('/search',verifyToken,searchContacts)



export default routes;