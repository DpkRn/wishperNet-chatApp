import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getContactsForDMLIst, searchContacts } from "../controllers/ContactsController.js";

const routes=Router()

routes.post('/search',verifyToken,searchContacts)
routes.get('/get-contacts-for-dm',verifyToken,getContactsForDMLIst)


export default routes;