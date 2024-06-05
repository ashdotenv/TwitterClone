import express from "express"
import { protectRoute } from "../middlware/protectRoute.js"
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser } from "../controller/user.controller.js"
const userRouter = express.Router()
userRouter.use(protectRoute)
userRouter.get("/profile/:username", getUserProfile)
userRouter.get("/suggested", getSuggestedUsers)
userRouter.post("/follow/:id", followUnfollowUser)
userRouter.post("/update", updateUser)
export { userRouter }