import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",//it means the sender id will be id from the user collection,if you don't pass the correct sender id , it will throw an error
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",//it means the receiver id will be id from the user collection,if you don't pass the correct sender id , it will throw an error
        // type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
    //createdAt, updatedAt
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema)

export default Message;
