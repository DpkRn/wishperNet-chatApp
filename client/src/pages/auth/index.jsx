import React, { useState } from "react";
import victory from "@/assets/victory.svg";
import Background from "@/assets/login2.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { Loader2 } from "lucide-react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {setUserInfo} =useAppStore()
  const [loading,setLoading]=useState(false)

  const validateSignUp = () => {
    if (!email.length) {
      toast.error("Email required !");
      return false;
    } else if (!email.includes("@")) {
      toast.error("Invalid Email !");
      return false;
    }
    if (!password.length) {
      toast.error("password required !");
      return false;
    } else if (password.length < 5) {
      toast.error("password length must be greater than 5");
      return false;
    }
    if (password != confirmPassword) {
      toast.error("password and confirm password must be same");
      return false;
    }
    return true;
  };
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email required !");
      return false;
    } else if (!email.includes("@")) {
      toast.error("Invalid Email !");
      return false;
    }
    if (!password.length) {
      toast.error("password required !");
      return false;
    } else if (password.length < 5) {
      toast.error("password length must be greater than 5");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    try {
      if (validateLogin()) {
        setLoading(true)
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
       setLoading(false)
        if (response.status === 200) {
          setUserInfo(response.data.user)
          if (response.data.user.profileSetup === false) {
            navigate("/profile");
          } else {
            navigate("/chat");
          }
        }else if(response.status===401){
          toast.error("invalid credential !")
        }else if(response.status===404){
          toast.error('user does not exist')
        }
      }
    } catch (err) {
      setLoading(false)
      toast.error("something went wrong !")
      
    }
  };

  const handleSignup = async () => {
    try {
      if (validateSignUp()) {
        setLoading(true)
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        setLoading(false)
        if (response.status === 201) {
          setUserInfo(response.data.user)
          if (response.data.user.profileSetup === false) {
            navigate("/profile");
          }
        }else if(response.status===409){
          toast.error("user already exists")
        }
      }
    } catch (err) {
      setLoading(false)
      toast.error("something went wrong !")
     
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <span className="absolute top-0 right-2">Powered By : Deepak Rn</span>
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center  justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="exs:max-sm:text-3xl md:text-5xl font-bold lg:text-6xl ">
                Welcome
              </h1>
              <img
                src={victory}
                alt="victory"
                className="h-[100px] exs:max-sm:h-[80px] "
              />
            </div>
            <p className="font-medium text-center">
              fill the details to get started with the best chat app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className=" bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5 mt-10">
                <Input
                  placeholder="email"
                  type="email"
                  value={email}
                  className="rounded-full p-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  className="rounded-full p-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                {loading&&<Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input
                  placeholder="email"
                  type="email"
                  value={email}
                  className="rounded-full p-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  className="rounded-full p-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="confirm password"
                  type="password"
                  value={confirmPassword}
                  className="rounded-full p-6"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  {loading&&<Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className=" hidden xl:flex justify-center items-center">
          <img src={Background} alt="background" className="h-[700px" />
        </div>
      </div>
    </div>
  );
}

export default Auth;
