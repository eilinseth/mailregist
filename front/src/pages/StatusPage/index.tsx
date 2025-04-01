import axios from "axios"
import { useState,useEffect, } from "react"
import { userDataBody } from "../../types"
import { useMutation } from "react-query"
import { userLogout } from "../../api/Logout"
import { useNavigate } from "react-router"


export default function StatusPage(){
    const [userId,setUserId] = useState("")
    const [userData,setUserData] = useState<userDataBody>({username:"",status:"unverified"})
    const navigate = useNavigate()


    const LogoutMutation = useMutation(userLogout,{
        onSuccess : () => {
            alert("Logout Success")
            navigate("/login")
        }
    })

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
                setUserData(res.data?.data)
            }catch(error){
                console.error(error)
            }
        }
        
      
        fethcUser()
    },[userId])

console.log(userData)


return(
    <div className="bg-gradient-to-b from-pink-100 via-indigo-400 min-h-screen w-lg relative">
        <nav className="flex items-center justify-end gap-2 mt-2">
            <button className="bg-gray-600 font-semibold text-white p-1 rounded-xl px-2 w-20 cursor-pointer">Verify</button>
            <button onClick={() => LogoutMutation.mutate()} className="bg-indigo-600 font-semibold text-white p-1 rounded-xl px-2 w-20 cursor-pointer">Logout</button>
        </nav>
        <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            
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

    </div>
    )
}