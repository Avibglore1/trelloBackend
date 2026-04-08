import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authController = async(req,res) =>{
    const {username,password} = req.body;
    let user = await User.findOne(username);
    if(!user){
        const hashedPassword = await bcrypt.hash(password,10)
        user = await User.create({
            username,
            password: hashedPassword,
            role: username==="admin" ? "admin" : "user"
        });
    }

    const token = jwt.sign({id: user._id,role: user.role, username},
        process.env.JWT_SECRET);
    res.json({token, role: user.role, username})
}