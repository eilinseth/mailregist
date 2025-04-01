import axios from "axios";

export const userLogout = async ():Promise<void> => {
    try{
        await axios.get("http://localhost:3000/logout",{withCredentials:true})

    }catch(error){
        console.error(error)
    }
}