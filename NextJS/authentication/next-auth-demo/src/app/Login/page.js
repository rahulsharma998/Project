"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){

  const [formData,setFormData]=useState({email:"",password:""});
  const [error,setError]=useState("");
  const router=useRouter();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError("");

    if(!formData.email || !formData.password){
      setError("All fields are required");
      return;
    }

    if(!/\S+@\S+.\S+/.test(formData.email)){
      setError("Invalid email format");
      return;
    }

    if (formData.password.length<6){
      setError("Password must be atleast 6 digit long")
      return;
    }

    try{
      const res=await fetch("/api/login",{
        method:"POST",
        body:JSON.stringify(formData),
      });
      if(!res.ok) throw new Error("Invalid Crrdentials");
      router.push("/dashboard");
    }catch(error){
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      {error && <p className="error" >{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Enter Email...." onChange={handleChange}/>
        <input type="password" name="password" placeholder="Enter Password...." onChange={handleChange}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}