import mongoose from "mongoose"
export const connection = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_URI)
        console.log("Connected to", con.connection.host);
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}