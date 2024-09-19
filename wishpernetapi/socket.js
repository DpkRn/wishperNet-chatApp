import {Server as SocketIOServer} from 'socket.io'
import Message from './models/MessagesModel.js';
const setupSocket=(server)=>{
    const io=new SocketIOServer(server,{
        cors:{
            origin:process.env.ORIGIN,
            methods:['GET','POST','DELETE'],
            credentials:true,
        },
    })

    const userSocketMap=new Map();

   const sendMessage=async (message)=>{
    const senderSocketId=userSocketMap.get(message.sender)
    const recipientSocketId=userSocketMap.get(message.recipient)

    const createdMessage=await Message.create(message)
    const messageData=await Message.findById(createdMessage._id)
                    .populate("sender","id email firstName lastName image color")
                    .populate("recipient","id email firstName lastName image color");
    
    if(recipientSocketId){
        io.to(recipientSocketId).emit("recieveMessage",messageData)
    }
    if(senderSocketId){
        io.to(senderSocketId).emit("recieveMessage",messageData)
    }
   };

    io.on('connection',(socket)=>{
        const userId=socket.handshake.query.userId;
        if(userId){
            userSocketMap.set(userId,socket.id);
              console.log(`user ${userId} connected with ${socket.id}`)  
        }else{
            console.log("userId not provided during connection")
        }
        
        socket.on('sendMessage',sendMessage)
        socket.on('disconnect',(socket)=>{
            console.log(`Client Disconnected ${userId}`)
            for(const [userId,socketId] of userSocketMap.entries()){
                if(socketId==socket.id){
                    userSocketMap.delete(userId)
                    break;
                }
            }
        });


        // socket.on('chat message',(msg)=>{
        //     console.log(msg)
        // })
        
    })
    
}

export default setupSocket;