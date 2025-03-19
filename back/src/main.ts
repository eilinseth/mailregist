import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes"
import session = require("express-session")
import MongoStore = require("connect-mongo")

dotenv.config()
const MongoURI = process.env.MONGO_URI as string

const port = 3000 ;
const app = express()

app.use(cors({
    credentials: true,
    origin : "http://localhost:5173"
}))
app.use(session({
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false,httpOnly:true,maxAge:1000*60*60*24,sameSite:"lax"},
    secret:process.env.SESSION_SECRET,
    store: MongoStore.create({mongoUrl:MongoURI})
}))
app.use(router)

mongoose.connect(MongoURI)
.then(() => {
    app.listen(port , () => {
        console.log(`App is listening to port ${port}`)
    })
})
.catch((error) => {
    throw error
})