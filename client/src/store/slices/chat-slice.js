export const createChatSlice=(set,get)=>({
    selectedChatType:undefined, //contact channel undefined // to check whether empty container show or contact container
    selectedChatData:undefined, // Account of specific person to show details on chat header
    selectedChatMessages:[],
    directMessagesContacts:[],
    setSelectedChatType:(selectedChatType)=>(set({selectedChatType})),
    setSelectedChatData:(selectedChatData)=>(set({selectedChatData})),
    setSelectedChatMessages:(selectedChatMessages)=>set({selectedChatMessages}),
    setDirectMessagesContacts:(directMessagesContacts)=>set({directMessagesContacts}),
    closeChat:()=>set({selectedChatData:undefined,selectedChatType:undefined,selectedChatMessages:[]}),
    addMessage:(message)=>{
        const selectedChatMessages=get().selectedChatMessages;
        const selectedChatType=get().selectedChatType;
         set({
             selectedChatMessages:[...selectedChatMessages,
                {...message,
                    recipent:selectedChatType==='channel'?message.recipient:message.recipient._id,
                    sender:selectedChatType==='channel'?message.sender:message.sender._id
                },],
        });
    },

})

