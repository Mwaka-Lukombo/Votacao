import { config } from "dotenv";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";


config();

const SECRET = process.env.SECRET;



export const protectedRoute = async(req,res,next)=>{

    const token = req.cookies.jwt;
    
    try {
        

        if(!token){
            return res.status(403).json({
                message:"Unauthorized - Nenhum token encontrado"
            })
        }

        const decoded = jwt.verify(token,SECRET);

        if(!decoded){
            return res.status(403).json({
                message:"Unautrhorized - token invalido"
            })
        }

        const user = await User.findOne({
            userIdentify:decoded?.id
        });

        if(!user){
            return res.status(404).json({
                message:"User not found!"
            })
        }

        req.user = user;

        next();
        
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}










