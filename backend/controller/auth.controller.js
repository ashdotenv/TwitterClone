import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import { userModel } from "../models/user.model.js"
import bcrypt from 'bcrypt';
export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid Email Format" })
        }
        const userNameExist = await userModel.findOne({ username: username })
        if (userNameExist) {
            return res.status(400).json({ message: "Username Already Exist " })
        }
        const emailExist = await userModel.findOne({ email: email })
        if (emailExist) {
            return res.status(400).json({ message: "Email Already Exist " })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            fullName: fullName,
            username: username,
            email: email,
            password: hashedPassword
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImge,
                coverImg: newUser.coverImg
            })
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const findUser = await userModel.findOne({ username: username })
        if (!findUser) {
            return res.status(401).json({ error: "Username doesn't Exist " })
        }
        const comparePassword = await bcrypt.compare(password, findUser.password)
        if (!comparePassword) {
            return res.status(401).json({ error: "Password doesn't Match" })
        }
        generateTokenAndSetCookie(findUser._id, res)
        return res.json({ message: "Logged In" })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
export const logout = async (req, res) => {
    console.log("121");
    try {
        return res.cookie("jwt", null, {
            expires: new Date(Date.now())
        }).json({ message: "Logged Out" })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" })

    }

}