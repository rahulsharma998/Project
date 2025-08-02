import Car from "../Models/CarModel.js";
export const getCars=async(req,res)=>{
  try{
    const cars=await Car.find();
    res.json(cars);
  }catch(error){
    res.status(500).json({message:"Server Error"})
  }
};