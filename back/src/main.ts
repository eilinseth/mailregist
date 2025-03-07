import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes"

dotenv.config()
const MongoURI = process.env.MONGO_URI as string

const port = 3000 ;
const app = express()

app.use(cors())
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