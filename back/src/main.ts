import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const MongoURI = process.env.MONGO_URI as string

const port = 8080 ;
const app = express()

app.use(cors())
mongoose.connect(MongoURI)
.then(() => {
    app.listen(port , () => {
        console.log(`App is listening to port ${port}`)
    })
})
.catch((error) => {
    throw error
})