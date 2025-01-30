import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleSignIn, signIn } from "../authServices";
import '../styles/SignIn.css'; 

function SignIn(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error,setError]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await signIn(email,password);
            navigate("/Home.js");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn=async()=>{
        try {
            await googleSignIn();
            navigate("./Home.js")//naviagte to home page
        } catch (error) {
            setError(error.message)
        }
    };

    return(
        <div className="auth-container">
            <h2>Sign In</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" value={password} placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">Sign In</button>
                </form>
                <div className="google-signin">
                    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                </div>
        </div>
    );

}
export default SignIn;