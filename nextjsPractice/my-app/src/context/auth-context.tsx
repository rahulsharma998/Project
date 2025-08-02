import React, {createContext, useContext, useEffect, useState,} from "react";
import { loginUser,registerUser,logoutUser } from "@/lib/auth";

const AuthContext=createContext(null);
export function authProvider({children}:{children:React.ReactNode}){
  const[user,setUser]=useState(null);
  useEffect(()=>{
    const storedUser=localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  },[]);
  async function login(email:string,password:string) {
    const data=await loginUser(email,password);
    if(data.user){
      setUser(data.user);
      localStorage.setItem("user",JSON.stringify(data.user));
    }
    return data;
  }

  async function register(email:string,password:string) {
   const data=await registerUser(email,password);
   if(data.user){
    setUser(data.user);
    localStorage.setItem("user",JSON.stringify(data.user));
   } 
   return data;
  }
  function logout(){
    logoutUser();
    setUser(null);
    localStorage.removeItem("user");
  }
  return (
    <AuthContext.Provider value={{user,login,register,logout}}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(){
  return useContext(AuthContext);
}