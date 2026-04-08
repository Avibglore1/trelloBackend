import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ["todo", "inprogress", "review", "completed"],
        default: "todo"
    },
    assignedTo: String
})

export default mongoose.model("Task", taskSchema);