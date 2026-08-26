import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import {config} from 'dotenv';

config();

const SECRET = process.env.SECRET;

const generateUserIdentify = () => {
    return Math.floor(10000 + Math.random() * 90000);
};

const generateToken = (id,res)=>{
    try {
        
        const token = jwt.sign({id},SECRET,{
            expiresIn:"7d"
        })

        res.cookie("jwt",token,{
            sameSite:"strict",
            httpOnly:true,
            maxAge:7 * 24 * 60  * 60 * 1000,
            secure:process.env.NODE_ENV === "production"
        })

        return token;
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}


export const loginUser = async(req,res)=>{
    const {
        userName
    } = req.body;

    try {
        const id = generateUserIdentify();
        
        if(!userName){
            return res.status(400).json({
                message:"Coloque o seu nome"
            })
        }
        
        const usersExists = await User.findOne({
            $or:[{userName},{userIdentify:id}]
        });

        let token;

        if(usersExists){
            token = generateToken(usersExists?.userIdentify,res);

            return res.status(200).json({
                message:"Login efectuado com sucesso",
                newUser:usersExists
            })
        }else{

            //new User 
            const newUser = new User({
                userIdentify:id,
                userName
            });

            token = generateToken(newUser?.userIdentify,res);
            await newUser.save();
            
          return res.status(200).json({
            message:"Usuario cadastrado com sucesso",
            newUser,
            token
          })
        }
       
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}


export const logout = async(req,res)=>{
    try {

        res.clearCookie("jwt");

        res.status(200).json({
            message:"Logout successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const checkUser = async(req,res)=>{
   const user = req.user;
    try {

        if(!user){
            return res.status(400).json({
                message:"Something went wrong"
            })
        }

        res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const createUser = async (req, res) => {

    const { userName } = req.body;

    try {

        // 1. Validar nome
        if (!userName || !userName.trim()) {
            return res.status(400).json({
                message: "Coloque o nome do usuário"
            });
        }

        // 2. Gerar identificador
        let userIdentify;

        // 3. Garantir que o identificador não existe
        do {
            userIdentify = generateUserIdentify();

        } while (
            await User.exists({ userIdentify })
        );

        // 4. Criar usuário
        const newUser = new User({
            userIdentify,
            userName: userName.trim()
        });

        await newUser.save();

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user: newUser
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .sort({ createdAt: -1 });

        return res.status(200).json(users);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const getSingleUser = async (req, res) => {

    const { id } = req.params;

    try {

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        return res.status(200).json(user);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export const getUserByIdentify = async (req, res) => {

    const { identify } = req.params;

    try {

        const userIdentify = Number(identify);

        if (
            !Number.isInteger(userIdentify) ||
            userIdentify < 10000 ||
            userIdentify > 99999
        ) {
            return res.status(400).json({
                message: "Identificador inválido"
            });
        }

        const user = await User.findOne({
            userIdentify
        });

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        return res.status(200).json(user);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export const updateUser = async (req, res) => {

    const { id } = req.params;
    const { userName } = req.body;

    try {

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        if (!userName || !userName.trim()) {
            return res.status(400).json({
                message: "Coloque o nome do usuário"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        user.userName = userName.trim();

        await user.save();

        return res.status(200).json({
            message: "Usuário atualizado com sucesso",
            user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


export const deleteUser = async (req, res) => {

    const { id } = req.params;

    try {

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        return res.status(200).json({
            message: "Usuário removido com sucesso"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

