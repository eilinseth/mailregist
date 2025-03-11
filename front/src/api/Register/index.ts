import axios,{AxiosError} from "axios"
import { userBody } from "../../types"

export const userRegister = async (data:userBody):Promise<void> =>{
    try{
        const res = await axios({
            method : "POST",
            url : "http://localhost:3000/register",
            data
        })

        return res.data

    }catch(error:unknown){
        if(error instanceof AxiosError){
            throw new Error(error.response?.data?.message || "Axios error occured")
        }

        throw new Error("An unexpected error occured")
    }
}