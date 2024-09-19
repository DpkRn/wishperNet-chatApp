import Message from "../models/MessagesModel.js";


export const getMessages = async (req, res, next) => {
  try {
    const user1=req.userId;
    const user2=req.body.id;
     console.log("user1=",user1)
     console.log("user2",user2)

    if (!user1 || !user2) {
      return res.status(400).send("both users are required !");
    }
   
    console.log(user2)
    const messages=await Message.find({
        $or:[
            {sender:user1,recipient:user2},
            {sender:user2,recipient:user1},
        ]
    }).sort({timestamp:1});
       
    console.log(messages)
    return res.status(200).json({messages})
   
  } catch (err) {
    res.status(500).send("Server internal error");
  }
};
