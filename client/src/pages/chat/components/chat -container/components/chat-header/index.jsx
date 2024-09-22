import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

function ChatHeader() {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  
  return (
    <div className=" border-b-2 flex items-center justify-between  border-[#2f303b] 
   
    p-3 gap-1 md:gap-3 ">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="p-1 relative ">
            <Avatar className="h-12 w-12 rounded-full relative overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover h-full w-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div className="flex flex-col">
            {selectedChatType === "contact" && (
              <span className="text-[22px] font-bold">
                {selectedChatData.firstName && selectedChatData.lastName
                  ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                  : ""}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => closeChat()}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
