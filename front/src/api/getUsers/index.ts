import axios,{AxiosError} from "axios";
import { Users } from "../../types";

export const getUsers = async ():Promise<Users> =>{
    try{
        const res = await axios.get("http://localhost:3000/getUsers")

        return res.data
          

    }catch(error){
        if(error instanceof AxiosError){
            throw new Error (error.response?.data?.message || "Axios error occured")
        }

        throw new Error("An unexpected error occured")
    }
}