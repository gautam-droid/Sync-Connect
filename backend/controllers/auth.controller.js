import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ "error": "Password's don't match" });
        }
        const user = await User.findOne({ username })
        // here we can also write (username) but since we are curly braces then we can pass multiple items

        //    checking if username exists or not
        if (user) {
            return res.json({ "error": "Username already exists" })
        }

        //HASH PASSWORD HERE

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username${username}`
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            //generate jwt token here

            // generateTokenAndSetCookie(newUser._id, res);
         
            //it is commented just because no signuped users can directly send the message, the jwt signing is done 
            //in the login controller to ensure that only logged in users can send the message




            // The res parameter is the HTTP response object. By passing this object to the generateTokenAndSetCookie function, 
            // the function can set the generated token as a cookie in the response.

            await newUser.save();//save on the database
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.userNane,
                profilePic: newUser.profilePic
            })

        }
        else {

            // In the provided code, newUser is created using the User model and populated with data from 
            // the request body (fullName, username, password, gender). If any of these fields are missing or invalid, 
            // the newUser object might not be created successfully
            res.status(400).json({ error: "Invalid user data" })
        }
    }
    catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log(user)
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")//if you omit that or part , and put either wrong
        //username or password, it will throw an error and it will lead to internal server error

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" })
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(400).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    }
    catch (error) {
        console.log("Error in login controller:", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}
export const logout = (req, res) => {
    try {
      res.cookie("jwt","",{maxAge:0})
      res.status(200).json({"message":"Logged out successfully"})

    } catch (error) {
        console.log("Error in logout controller:", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}