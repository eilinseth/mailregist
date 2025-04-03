import {  Routes , Route } from "react-router-dom"
import Register from "../pages/Register"
import Login from "../pages/Login"
import StatusPage from "../pages/StatusPage"
import { VerifyPage } from "../pages/VerifPage"


export default function MyRoutes () {

    return (
        <Routes>
            <Route path="/*" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/status" element={<StatusPage/>} />
            <Route path="/verify" element={<VerifyPage/> } />
        </Routes>
    )
}