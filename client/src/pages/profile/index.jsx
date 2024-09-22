import { useAppStore } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import {
  ADD_PROFILE_IMAGE,
  HOST,
  REMOVE_PROFILE_IMAGE,
  UPDATE_PROFILE_INFO,
} from "@/utils/constants";
import { toast } from "sonner";

function Profile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${userInfo.image}`);
    }
  }, [userInfo, setUserInfo]);
  const validateProfile = () => {
    if (!firstName) {
      toast.error("first name is required !");
      return false;
    }
    if (!lastName) {
      toast.error("last name is required !");
      return false;
    }
    return true;
  };

  const saveChanges = async (e) => {
    try {
      if (validateProfile()) {
        const response = await apiClient.post(
          UPDATE_PROFILE_INFO,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.user) {
          setUserInfo({ ...response.data.user });
          toast.success("profile updated successfully !");
          navigate("/chat");
        }
      }
    } catch (err) {
      toast.error("something went wrong! try again");
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("please complete profile to continue");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async() => {
        setImage(reader.result);
        const response = await apiClient.post(ADD_PROFILE_IMAGE, {image:reader.result} ,{
          withCredentials: true,
        });
        if (response.status === 200 && response.data.image) {
          
          console.log(response.data.image)
          setUserInfo({ ...userInfo, image: response.data.image });
          console.log(userInfo)
          toast.success("Image updated successfully ");
        } else {
          toast.error("something got wrong ! try again");
        }
       
      };    
    }
  };

  const handleImageDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({...userInfo,image:null})
        setImage(null)
        toast.success("Image Deleted Successfully !");
      }
    } catch (err) {
      toast.error("something went wrong, try again !");
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col  gap-10 w-[80vw] h-[80vh] lg:w-[60vw] xl:w-[45vw]">
        <div>
          <IoArrowBack
            className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
            onClick={handleNavigate}
          />
        </div>
        <div className="grid sm:grid-cols-1 exs:gap-5 md:grid-cols-2 place-items-center  ">
          <div className="h-full w-full  flex items-center justify-center md:justify-start  overflow-hidden">
            <Avatar
              className="h-32 w-32 md:w-48 md:h-48 rounded-full relative overflow-hidden"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {image ? (
                <AvatarImage
                  src={image}
                  className="object-cover h-full w-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-full w-full  text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
              {hover && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
                  onClick={image ? handleImageDelete : handleFileInputClick}
                >
                  {image ? (
                    <FaTrash className="text-white text-3xl cursor-pointer" />
                  ) : (
                    <FaPlus className="text-white text-3xl cursor-pointer" />
                  )}
                </div>
              )}
            </Avatar>
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept="[.jpg, .png, .jpeg, .svg, .webp]"
              ref={fileInputRef}
            />
          </div>

          <div className="flex  w-full flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className=" rounded-lg p-6 bg-[#2c2e3b] w-full border-none"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="First Name"
                type="text"
                value={firstName}
                className=" rounded-lg p-6 w-full bg-[#2c2e3b] border-none"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Last Name"
                type="text"
                value={lastName}
                className=" rounded-lg p-6 bg-[#2c2e3b] border-none w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index
                      ? "outline outline-white border-none outline-1"
                      : ""
                  }`}
                  key={index}
                  onClick={(e) => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <Button
          className=" h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
          onClick={saveChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default Profile;
