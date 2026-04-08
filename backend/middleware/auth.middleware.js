import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({message: "unauthorized"});

    if(!authHeader.startsWith("Bearer ")){
        return res.status(400).json({message: "Invalid token format"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid or expired token"})
    }
}