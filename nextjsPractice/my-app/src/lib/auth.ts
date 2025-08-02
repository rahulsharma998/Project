export async function loginUser(email:string,password:string) {
  try{
    const res=await fetch("api/auth/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    });
    return await res.json();
  }catch(error){
    console.error("Login Error:",error);
    return {error:"Something went wrong"};
  }
}
export async function registerUser(email:string,password:string) {
  try{
    const res=await fetch("api/auth/register",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password}),
    });
    return await res.json();
  }catch(error){
    console.error("Registration Error:",error);
    return{error:"Something went wrong"};
  }
}
export async function logoutUser() {
  await fetch("api/auth/logout",{method:"POST"});
}