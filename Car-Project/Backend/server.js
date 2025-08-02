import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose  from "mongoose";
import authRoutes from "../Backend/Routes/authRoutes.js"
import carRoutes from "../Backend/Routes/carRoutes.js"


dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes)
app.use("/api/cars",carRoutes)

const PORT=process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("Mongodb Connected");
  app.listen(PORT,()=>console.log(`Server is running on Portv${PORT}`));
}).catch((err)=>console.error("MongoDB Connection Error",err));