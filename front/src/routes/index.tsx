import {  Routes , Route } from "react-router-dom"
import Register from "../pages/Register"
import Login from "../pages/Login"
import VerifPage from "../pages/VerifPage"


export default function MyRoutes () {

    return (
        <Routes>
            <Route path="/*" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verif" element={<VerifPage/>} />
        </Routes>
    )
}