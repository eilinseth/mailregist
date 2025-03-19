import axios from "axios"
import { useState,useEffect, } from "react"
import { getUser } from "../../api/getUser"
import { userDataBody } from "../../types"


export default function VerifPage(){
    const [userId,setUserId] = useState("")
    const [userData,setUserData] = useState({})

    useEffect(()=>{
        async function fetchingId (){
            try{
                const res = await axios.get("http://localhost:3000/checkAuth",{withCredentials:true})
                setUserId(res.data.user.id)
            }catch(error){
                console.error(error)
            }

        }

        fetchingId()

    },[]
)

    useEffect(()=>{
        async function fethcUser() {
            try{
                if(!userId){
                    console.log("Please wait while fetching userId")
                    return
                }
                const id = userId
                const res = await axios.get(`http://localhost:3000/getUser/${id}`)
                if(!res){
                    console.log("Please wait while getting data")
                }
                setUserData(res.data.data)
            }catch(error){
                console.error(error)
            }
        }
        
      
        fethcUser()
    },[userId])

console.log(userData)


return(
        <div className="flex items-center justify-center bg-gradient-to-b from-pink-100 via-indigo-400 min-h-screen w-lg">
            
                {userId ? (
                    <div className="flex gap-2 flex-col">
                    <div className="flex justify-between gap-1">
                    <h1 className="">Username :</h1>
                    <p>{userData.username}</p>
                </div>
                <div className="flex justify-between">
                    <h1 className="">Status : </h1>
                    <p> {userData.status}</p> 
                </div>
                </div>) : (

                    <p className="text-2xl font-bold"> Please wait... </p>
                )
                }
                
            
        </div>
    )
}