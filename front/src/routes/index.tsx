import {  Routes , Route } from "react-router-dom"
import Register from "../pages/Register"
import Login from "../pages/Login"


export default function MyRoutes () {

    return (
        <Routes>
            <Route path="/*" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}