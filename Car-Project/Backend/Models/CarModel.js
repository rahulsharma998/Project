import mongoose from "mongoose";
const CarSchema=new mongoose.Schema({
  brand:{type:String, required:true},
  model:{type:String, required:true},
  image:{type:String, required:true},
  description:{type:String, required:true},
  year:{type:Number, required:true},
  price:{type:Number, required:true},
})
export default mongoose.model("Car",CarSchema);