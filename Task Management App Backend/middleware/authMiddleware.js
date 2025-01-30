import jwt from "jsonwebtoken";

const authentication=async(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token) return res.status(401).json({message:"Invalid Access"});
    try{
        const verified=jwt.verify(token,process.env.jwt_Secret);
        req.user=verified;
        next();
    } catch(err){
        res.status(400).json({message:"Invalid Token"});
    }
};
export default authentication;