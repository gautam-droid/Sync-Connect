import mongoose from "mongoose";

const connectToMongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to database successfully");
    } catch (error) {
        console.log("error connection to database",error.message)
    }
}

export default connectToMongoDB

//no problem