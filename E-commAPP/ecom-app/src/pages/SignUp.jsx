import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { signUp, googleSignIn } from "../authServices";
import '../styles/SignUp.css'; 

function SignUp(){
    const navigate=useNavigate();
    const [fullName, setFullName]=useState("");
    const [phone, setPhone]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error,setError]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await signUp(email,password,fullName,phone);
            navigate('/signin');
        } catch (error) {
            setError(error.message);
        }
    };
    const handleGoogleSignUp=async()=>{
        try {
            await googleSignIn();
            navigate("./Home.js")//homepage navigate
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <>
            <h2>Sign Up</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="FullName" required />
                <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone" required />
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
            <div className="google-signup">
                <button onClick={handleGoogleSignUp}>Sign up with Google</button>
            </div>
        </>
    );

}
export default SignUp;