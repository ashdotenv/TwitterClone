import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId
        , ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId
        , ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["Follow", "Like"]
    },
    read: {
        type: Boolean,
        default: false
    }
})
export const notificationModel = mongoose.model("Notification", notificationSchema)
