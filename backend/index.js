import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";
import authRoutes from "./router/auth.routes.js";
import taskRoutes from "./router/task.routes.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server,{cors: {origin: "*"}});

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/", authRoutes);
app.use("/", taskRoutes);

server.listen(5000);

