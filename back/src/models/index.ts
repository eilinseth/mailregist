import { User } from "../types";
import { Schema , model } from "mongoose";

const userSchema : Schema = new Schema (
    {
        username : {
            type: String,
            required : true
        },
        email : {
            type : String,
            required : true,
        },
        password : {
            type  : String,
            required : true
        },
        status : {
            type : String ,
            enum : ["unverified" , "verified" ] as const ,
            default : "unverified",
            required : true
        }
    },
    {timestamps : true}
)

export default model<User>('User',userSchema)