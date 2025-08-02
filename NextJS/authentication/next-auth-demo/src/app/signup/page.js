"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SignUp(){

  const [formData,setFormData]=useState("");
  const [error, setError]=useState("");
  const router=useRouter();
  
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventdefault();
    setError("");

    if(!formData.email ||!formData.password || !formData.confirmPassword){
      setError("All fields are required");
      return;
    }

    if(!/\S+@\S+\.\S+/.test(formData.email)){
      setError("Invalid email format");
      return;
    }
    if(formData.password.length<6){
      setError("Password must be atleast 6 characters")
      return
    }
    if(formData.password !==formData.confirmPassword){
      setError("Invalid Password");
      return;
    }
    try{
      const res=await fetch("/api/signup",{
        method:"POST",
        body:JSON.stringify(formData),
      });
      if(!res.ok) throw new Error("Signup failed");
      router.push("/login");
    }catch(error){
      setError("Signup Failed. Try again.");
    }
  };


  return (
    <div className="signup-container">
      <h2>SignUp Page</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Enter Your Email" onChange={handleChange}/>
        <input type="password" name="password" placeholder="Enter Your Password" onChange={handleChange}/>
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}