import { Router } from "express";
import bodyparser from "body-parser"
import { login, register ,getUsers} from "../controller";

const router = Router()
const parser = bodyparser.json()

router.post("/register",parser,register)
router.post("/login",parser,login)
router.get("/getUsers",parser, getUsers)


export default router