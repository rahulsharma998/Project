import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_Url)
        console.log("MongoDB Connected")
    }catch(error){
        console.error(error);
        process.exit(1)
    }
}
export default connectDB;