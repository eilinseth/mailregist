import axios,{AxiosError} from "axios";
import { loginBody } from "../../types";

export const userLogin = async (data:loginBody):Promise<void> =>{
    try{
        const res = await axios({
            method :"POST",
            url : "http://localhost:3000/login",
            data : data,
            withCredentials:true,
            headers:{
                "Content-Type" : "application/json"
            }
        })

        return res.data
        
    }catch(error:unknown){
        if(error instanceof AxiosError){
            throw new Error(error.response?.data?.message || "Axios error occured")
        }
        throw new Error("An unexpected error occured")
    }
}