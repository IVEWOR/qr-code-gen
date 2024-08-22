import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose
            .connect("mongodb://127.0.0.1:27017/qr-code-gen")
            .then(() => console.log("db connected"));
    } catch (error) {
        throw new Error("error in connecting db ", +error);
    }
};

export default connectDB;