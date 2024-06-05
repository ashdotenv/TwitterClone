import express from "express"
import { getMe, login, logout, signup } from "../controller/auth.controller.js"
import { protectRoute } from "../middlware/protectRoute.js"
const authRouter = express.Router()
authRouter.get("/me", protectRoute, getMe)
authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
export { authRouter }