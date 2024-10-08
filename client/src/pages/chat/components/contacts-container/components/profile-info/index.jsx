import { AvatarImage, Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import { getColor } from "@/lib/utils";

import { useAppStore } from "@/store";
import { HOST, LOGOUT } from "@/utils/constants";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
    const navigate=useNavigate()
  const { userInfo,setUserInfo } = useAppStore();

  const logOut=async ()=>{
    try{

        const response=await apiClient.post(LOGOUT,{},{withCredentials:true})
        if(response.status===200){
            setUserInfo(undefined)
            navigate('/login')
        }
    }catch(err){
        toast.error("something went wrong! try again")
    }

  }
  return (
    <div className="absolute  flex items-center justify-between px-5 py-[11px] w-full bg-[#2a2b33]
   bottom-2">
      <div className="flex gap-3  items-center justify-center">
        <div className=" relative">
          <Avatar
            className="h-12 w-12 rounded-full relative overflow-hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {userInfo.image ? (
              <AvatarImage
                src={`${userInfo.image}`}
                alt="profile"
                className="object-cover h-full w-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div className="text-lg font-bold">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger >
                <FiEdit2 className="text-purple-500 text-xl font-medium" onClick={()=>navigate('/profile')}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger >
                <IoPowerSharp className="text-red-500 text-xl font-medium" onClick={logOut}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
