import User from "../models/user.model.js"

export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        //find all the userId except the loggedIn user id
        //ne stands for not equal
        //note if you want to find every user in the database just do user.find()
        console.log(filteredUsers);
        res.status(200).json(filteredUsers)
    }
    catch (error) {
        console.log("Error in getUsersForSidebar function:", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}