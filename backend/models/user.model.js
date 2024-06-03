import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,

        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
    ,
    password: {
        type: String,
        required: true,
        minLength: 8
    }
    ,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId
            , ref: "User"
            , default: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId
            , default: []
            , ref: "User"
        }
    ],
    profileImg: {
        type: String,
        default: ""
    },
    coverImg: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    }
})
export const userModel = new mongoose.model("User", userSchema)
