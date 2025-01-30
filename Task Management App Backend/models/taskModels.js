import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title:{type:String, required:true },
    description:String,
    dueDate:Date,
    priority:{type:String, enum:['Low', 'Medium', 'High'], default:'Medium' },
    status:{ type:String, enum:['Pending', 'Completed'], default:'Pending' },
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true }
});
export default mongoose.model("Task",taskSchema)

