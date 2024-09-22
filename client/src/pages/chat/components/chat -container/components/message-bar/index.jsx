import { useSocket } from "@/context/SocketContext";
import { useAppStore } from "@/store";
import EmojiPicker from "emoji-picker-react";
import React, { useRef, useState, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

function MessageBar() {
  const [message, setMessage] = useState("");
  const emojiRef = useRef();
  const [emojiShow, setEmojiShow] = useState(false);
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();
  const socket = useSocket();

  const handleClickOutside = (event) => {
    if (emojiRef.current && !emojiRef.current.contains(event.target)) {
      setEmojiShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    //return in useEffect only used when compound is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef, setEmojiShow]);

  const handleEmojiClick = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        recipient: selectedChatData._id,
        content: message,
        messageType: "text",
        fileUrl: undefined,
      });

      setMessage("");
    }
  };
  return (
    <div
      className=" bg-[#1c1d25] flex  px-3 md:px-8 mb-2 gap-1 md:gap-6   
"
    >
      <div
        className=" flex bg-[#2a2b33] rounded-md items-center gap-1 md:gap-5 pr-5
       w-[100%] ">
        <input
          type="text"
          className=" p-3 md:p-5 bg-transparent rounded-md focus:border-none focus:outline-none w-[100%]"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="relative flex  md:gap-2 lg:gap-3">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all
                  "
          >
            <GrAttachment className=" text-lg md:text-2xl lg:text-4xl" />
          </button>

          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all ml-1"
            onClick={() => setEmojiShow(true)}
          >
            <RiEmojiStickerLine className="text-xl md:text-2xl lg:text-4xl" />
          </button>
          </div>

          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              open={emojiShow}
              theme="dark"
              onEmojiClick={handleEmojiClick}
            />
          </div>
        </div>
    
      <button
        className="bg-[#8417ff] rounded-md flex items-center 
        justify-center p-3 md:py-4 md:px-7 hover:bg-[#741bda] focus:bg-[#741bda] 
        focus:border-none focus:outline-none focus:text-white duration-300
         transition-all  "
        onClick={handleSendMessage}
      >
        <IoSend className="text-xl" />
      </button>
    </div>
  );
}

export default MessageBar;
