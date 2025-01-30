import Task from "../models/taskModels.js";

export const createdTask=async(req,res)=>{
    try{
        const {title, description, dueDate, priority, status}=req.body;
        const task =new Task({...req.body,userId:req.user._id});
        await task.save();
        res.status(201).json(task)
    }catch(error){
        res.status(500).json({message:"Error in creating task"})
    }
}
export const getAllTask=async(req,res)=>{
    try{
        const tasks=await Task.find({userId:req.user._id});
        res.json(tasks)
    } catch(error){
        res.status(500).json({message:"Error fetching tasks"})
    }
};
export const getTaskByID=async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message:"Task not found"});
        res.json(task);
    }catch(error){
        res.status(500).json({message:"Error fetching task"})
    }
};

export const updatedTask=async(req,res)=>{
    try{
        const task= await Task.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!task) return res.status(404).json({message:"Task not found"});
        res.json(task)
    }catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
};

export const deleteTask=async(req,res)=>{
    try{
        const task =await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).json({message:"Task not found"})
        res.json({message:"Task deleted Successfully"});
    }catch(error){
        res.status(500).json({message:"Error in deleting task"})
    }
};