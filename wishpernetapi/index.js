import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRoute from './routes/AuthRoutes.js'
import ContactsRoute from './routes/ContactRoutes.js'
import setupSocket from './socket.js'
import MessageRoute from './routes/MessageRoute.js'
import path from 'path'
dotenv.config()
const app=express()
const port=process.env.PORT || 8747
const database_Url=process.env.DATABASE_URL




app.use(cors({
    origin:process.env.ORIGIN,
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}));



app.use(express.static(path.join(path.resolve(), 'wishpernet','dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
});

app.use('/uploads/profiles',express.static('uploads/profiles'))
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',AuthRoute)
app.use('/api/contacts',ContactsRoute)
app.use('/api/messages',MessageRoute)


app.get('/ping',(req,res)=>{
    return res.status(200).json("pong")
})
const server=app.listen(port,()=>{
    console.log(`Server running on port: http://localhost:${port}`)
})

setupSocket(server)

mongoose.connect(database_Url).then(()=>{
    console.log("connected database !")
}).catch(err=>console.log(err))

