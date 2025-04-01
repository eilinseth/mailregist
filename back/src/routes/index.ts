import { Router } from "express";
import bodyparser from "body-parser"
import { login, register ,getUsers ,getUser, checkAuth, logout} from "../controller";

const router = Router()
const parser = bodyparser.json()

router.post("/register",parser,register)
router.post("/login",parser,login)
router.get("/getUsers",parser, getUsers)
router.get("/getUser/:id",parser, getUser)
router.get("/checkAuth",parser,checkAuth)
router.get("/logout",parser,logout)


export default router