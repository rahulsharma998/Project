import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRoutes from "./Routes/taskRoutes.js"
import userRoutes from "./Routes/userRoutes.js"
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); 
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.send('Task Management API is running...');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
