// import React from 'react'

import { useState } from "react"

const Login = () => {


    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("")

    const submitHandler=(e)=>{
        e.preventDefault()
        setEmail("")
        setPassword("")
    }

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
        <div className="border-2 rounded-xl border-emerald-600 p-20">
            <form onSubmit={(e)=>{
                submitHandler(e)
            }} className="flex flex-col items-center justify-center">
                <h1 className=" mt-3 py-2 px-6 text-3xl text-white  " >Login</h1>
                <input className=" mt-3 border-2 border-emerald-600 font-medium  rounded-full py-2 px-6 text-lg text-white outline-none bg-transparent placeholder:text-gray-400" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your Email" required />
                <input className=" mt-3 border-2 border-emerald-600 font-medium  rounded-full py-2 px-6 text-lg text-white outline-none bg-transparent placeholder:text-gray-400" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password" />
                <button className=" mt-4 border-2 rounded-full bg-emerald-600 py-3 px-5 text-white outline-none text-xl  placeholder:text-white">Submit</button>
            </form>

        </div>
    </div>
  )
}

export default Login
