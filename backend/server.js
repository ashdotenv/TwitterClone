import express from "express"
import dotenv from "dotenv"
dotenv.config({})
import { authRouter } from "./routes/auth.route.js"
import { connection } from "./db/connection.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import {userRouter} from "./routes/user.route.js"
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

const port = process.env.port || 5000
app.listen(port, () => {
    console.log('Serving On Port', port)
    connection()
})