import { NavLink } from "react-router-dom"


export const VerifyPage = () => {
    return (
        <div className="bg-gradient-to-t from-cyan-900 to bg-cyan-300/50 min-h-screen w-xl relative">
            <div className="flex gap-2 px-4 pt-2 text-center">
                <NavLink to="/register" className="p-1 bg-gray-600 font-semibold text-white rounded-xl px-2 w-20">Back</NavLink>
                <NavLink to="/login" className="p-1 bg-indigo-600 font-semibold text-white rounded-xl px-2 w-20">Login</NavLink>
            </div>

            <div className="flex w-xl items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-950 to bg-purple-600">Please check your email to verify</p>
            </div>
        </div>
    )
}