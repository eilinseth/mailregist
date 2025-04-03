import { Request,Response } from "express";
import UserModel from "../models"
import { User } from "../types";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendMail } from "../services/mailService";

const getUsers = async (req:Request,res:Response):Promise<void> => {
    try{
        const users:User[] = await UserModel.find().select('_id username email status')

        res.status(200).json({
            status : 200 , 
            message : users
        })

    }catch(error){
        console.error(`${error}`)
        res.status(500).json({
            status : 500,
            message : "Internal Server Error"
        })
    }
}

const register = async (req:Request,res:Response):Promise<void> => {
    try{
        const {username , email , password} = req.body
        if(!username || !email || !password){
            res.status(400).json({
                status : 400,
                message : "Bad Request - Missing Fields"
            })
            return
        }

        const sameUser = await UserModel.findOne({$or : [{username} , {email}]})
        if(sameUser){
            res.status(409).json({
                status : 409,
                message : "Username or Email already in use"
            })
    
            return
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
    
        const newUser = new UserModel({
            username,
            email,
            password : hashedPassword,
            status : "unverified"
        })
    

        await newUser.save()

        if(!process.env.JWT_SECRET){
            res.status(500).json({
                status : 500 , 
                message : "Jwt Secret is missing "
            })

            return
        }
        
        const token = jwt.sign({email} , process.env.JWT_SECRET , {expiresIn :"1h"})
    

        await sendMail(email,token)

        res.status(200).json({
            status : 200,
            message : "Created",
            added : {
                id : newUser._id,
                username : newUser.username,
                status : newUser.status
            }
        })
        
    }catch(error){
        console.error(`${error}`)
        res.status(500).json({
            status : 500,
            message : "Internal Server Error"
        })
    }

    
}

const login = async (req:Request,res:Response):Promise<void> =>{
    try{
        const {userMail,password} = req.body

        if(!userMail && !password){
            res.status(401).json({
                status : 401,
                message : "Authorization declined"
            })       
            return     
        }

        const isRegistered = await UserModel.findOne({$or: [{username:userMail},{email:userMail}]})
        if(!isRegistered){
            res.status(400).json({
                status : 400 ,
                message : "Username or email not registered"
            })
            return
        }
        if(isRegistered.status === "unverified"){
            res.status(401).json({
                status : 401 ,
                message : "Please verifiy your email first"
            })

            return
        }

       

        const match = await bcrypt.compare(password,isRegistered.password)
        if(!match){
            res.status(401).json({
                status : 401,
                message : "Wrong Password"
            })
            return
        }else{
            req.session.user = { id:isRegistered._id.toString() , username:isRegistered.username}
            res.status(200).json({
                status : 200 ,
                message : "Login Success"
            })
        }

    }catch(error){
        console.error(`${error}`)
        res.status(500).json({
            status : 500,
            message : "Internal server error"
        })
    }
}

const checkAuth = (req:Request,res:Response) =>{
    try{
        if(!req.session.user){
            res.status(400).json({
                status : 400,
                isAuthenticated : false,
                message : "Not Authenticated"
            })

            return
        }

        res.json({
            isAuthenticated : true ,
            user : req.session.user
        })


    }catch(error){
        console.error(error)
        res.status(500).json({
            status:500,
            message : "Internal Server Error"
        })
    }
}

const logout = (req:Request,res:Response) =>{
    try{
        req.session.destroy(()=>res.json({message:"Logged Out"}))

    }catch(error){
        console.error(error)
        res.status(500).json({
            status : 500 ,
            message : "Internal server error"
        })
    }
}

const getUser = async (req:Request,res:Response):Promise<void> =>{
    try{
        const {id} = req.params
        const findId = await UserModel.findById(id).select("_id username email status")
        if(!findId){
            console.log("Id not found")
            res.status(400).json({
                status : 400,
                message : "Not Found"
            })
            return
        }

        res.status(200).json({
            status : 200 ,
            message : "found",
            data : findId
        })

    }catch(error){
        console.error(error)
        res.status(500).json({
            status : 500,
            message : "Internal Server Error"
        })
    }
}

const verifyEmail = async (req:Request,res:Response):Promise<void> => {
    const token = req.query.token
    if(!token){
        res.status(400).send("Token not provided")
        return  
    }  
    try {
    
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        await UserModel.updateOne({email:decoded.email},{$set : {status : "Verified"}})

        res.send("Email verified")


    }catch(error){
        console.error(error)
        res.status(400).json({
            status : 400,
            message : "Invalid or expired token"
        })
    }
}

export {register,login,getUsers,getUser,logout,checkAuth,verifyEmail}