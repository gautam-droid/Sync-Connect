// export const sendMessage=(req,res)=>{
//     console.log("first message",req.params.id);
//     res.status(200).json({"message":"successfully sent"})
// } 
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;//we can also do something like this const id=req.params.id
        const senderId = req.user._id
        // console.log(req); // Logging the entire request object
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        // for example, if the "participants" field is an array like [senderId, receiverId], the query would still match. 
        // However, if the array contains additional elements or if the order is different like [receiverId, senderId], 
        // the query would not match.
        // Using $all ensures that all specified elements are present in the array, regardless of their order or additional elements.




        console.log("conversation..........", conversation)
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save(); if it takes 1 sec
        // await newMessage.save();   it will have to wait for 1 sec to run 
        // console.log(conversation);


        //socket io functionality will go here

        //this will run in parallel, both it will take same time
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)
    }

    catch (error) {
        console.log("error in message controller", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")

        if(!conversation) return res.status(200).json([])

        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log("error in message controller", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}

