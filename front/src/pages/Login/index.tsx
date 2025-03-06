import {useForm} from "react-hook-form"
import { NavLink } from "react-router-dom"

export default function Login (){

    return (
        <div className="flex items-center flex-col justify-center py-14 bg-cyan-50/60 w-3/4 min-h-[80%] lg:w-1/3 text-slate-600">
            <h1 className="text-3xl font-bold mb-10">Login</h1>
            <form className="flex flex-col gap-6 font-semibold mt-5 mb-7">
                <div className="flex flex-col gap-2">
                    <label htmlFor="usermail" className="text-[1.2rem]">Username or Email :</label>
                    <input type="text" id="usermail" className="shadow-xl w-68 px-2 p-1 bg-slate-100 rounded-lg" placeholder="Enter your username or email ..." />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-[1.2rem]">Password :</label>
                    <input type="password" id="password" className="shadow-xl w-68 px-2 p-1 bg-slate-100 rounded-lg" placeholder="Enter your password ..." />
                </div>
                <button type="submit" className="cursor-pointer p-1 rounded-lg bg-green-400 text-white font-semibold w-24 mx-auto mt-8">Submit</button>
            </form>
             <p className='mb-1'>Create Account </p>
            <NavLink to="/register"  className="cursor-pointer p-1 text-center bg-indigo-400 rounded-lg  text-white font-semibold w-24 mx-auto ">Register</NavLink>

        </div>
    )
}