import { io } from "../index.js";
import Task from "./../model/task.model.js"

export const createTaskController = async(req,res) =>{
    try {
        if(req.user.role !== "admin"){
        return res.status(403).json({message: "Unauthorized"})
    }
    
    const {title,description,assignedTo} = req.body;
    const task = await Task.create({
        title,description,assignedTo,status: "todo"
    });

    io.emit("taskCreated", task);
    res.status(201).json(task);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
};

export const getAllTaskController = async(req,res) =>{
    try {
        const tasks = req.user.role === "admin" 
        ? await Task.find() 
        : await Task.find({assignedTo: req.user.username});
         res.json(tasks);
    } catch (error) {
        return res.staus(500).json({message: error.message})
    }
}

export const updateTaskController = async(req,res)=>{
    try {
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true});
        io.emit("taskUpdated", task);
        res.json(task);
    } catch (error) {
        return res.status(500).json({message: "Server error"});
    }
    
}