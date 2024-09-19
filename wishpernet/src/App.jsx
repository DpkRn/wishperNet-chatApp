import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@/components/ui/button'
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'

import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import Error from '@/pages/error/Error'
import { useAppStore } from './store'
import axios from 'axios'
import { toast } from 'sonner'
import { GET_USER_INFO } from './utils/constants'
import { apiClient } from './lib/api-client'


const PrivateRoute=({children})=>{
  const {userInfo}=useAppStore();
  const isAuthenticated= !!userInfo
  return isAuthenticated?children:<Navigate to='/auth'/>
}
const AuthRoute=({children})=>{
  const {userInfo}=useAppStore();
  const isAuthenticated= !!userInfo
  return isAuthenticated?<Navigate to='/chat'/>:children;
}

function App() {
  const {userInfo,setUserInfo}=useAppStore()
  const [loading,setLoading]=useState(true)

  const getUserData=async ()=>{
   
    try{
     const response=await apiClient.get(GET_USER_INFO,{withCredentials:true})
     if(response.status===200 && response.data.user){
       setUserInfo(response.data.user)
     }else{
       setUserInfo(undefined)
     }
    }catch(err){
     setUserInfo(undefined)
    }finally{
     setLoading(false)
    }
}
  useEffect(()=>{
    
    if(!userInfo){
      getUserData()
    }
      else{
       setLoading(false)
       
    }
  },[userInfo,setUserInfo])
  
  if(loading)
    return <>Loading...</>
  return (
    
   <BrowserRouter>
   
   <Routes>
    <Route path='/auth' element={<AuthRoute>
      <Auth/>
    </AuthRoute>}/>
    <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}/>
    <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
    <Route path='/' element={<AuthRoute><Auth/></AuthRoute>}/>
    <Route path='*' element={<Error/>}/>
   </Routes>
   
   </BrowserRouter>
  
  )
}

export default App
