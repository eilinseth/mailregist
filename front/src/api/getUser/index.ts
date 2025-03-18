import { userId } from "../../types";
import axios , {AxiosError} from "axios";

export const getUser = async  (id:userId) =>{
    try{
        const res = await axios.get(`http://localhost:3000/getUser/${id}`)

        return res.data
        
    }catch(error:unknown){
        if(error instanceof AxiosError)
            console.error(error.response?.data?.message || "Axios error occured")
    }
    console.error("An unexpected error occured")
}