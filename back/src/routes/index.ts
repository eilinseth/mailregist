import { Router } from "express";
import bodyparser from "body-parser"
import { login, register ,getUsers ,getUser} from "../controller";

const router = Router()
const parser = bodyparser.json()

router.post("/register",parser,register)
router.post("/login",parser,login)
router.get("/getUsers",parser, getUsers)
router.get("/getUser/:id",parser, getUser)


export default router