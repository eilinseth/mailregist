import { Request,Response } from "express";
import UserModel from "../models"
import { User } from "../types";
import bcrypt from "bcryptjs"

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
        if(!username && !email && !password){
            res.status(400).json({
                status : 400,
                message : "Bad Request - Missing Fields"
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
    
        const sameUser = await UserModel.findOne({$or : [{username:newUser.username} , {email:newUser.email}]})
        if(sameUser){
            res.status(409).json({
                status : 409,
                message : "Username or Email already in use"
            })
    
            return
        }else{
            await newUser.save()
            res.status(200).json({
                status : 200,
                message : "Created",
                added : {
                    id : newUser._id,
                    username : newUser.username,
                    status : newUser.status
                }
            })
        }
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

export {register,login,getUsers,getUser,logout,checkAuth}