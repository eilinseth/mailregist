import { Router } from "express";
import bodyparser from "body-parser"
import { register } from "../controller";

const router = Router()
const parser = bodyparser.json()

router.post("/register",parser,register)
router.post("/login",parser)


export default router