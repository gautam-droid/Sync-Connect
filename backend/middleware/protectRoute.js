import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ "error": "Unauthorized no token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        if (!decoded) {
            return res.status(401).json({ "error": "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.userId).select("-password");//dont include the password field
       console.log("user.........",user)
        if (!user) {
            return res.status(404).json({ "error": "User not found" })
        }
        req.user = user;
        // Once the user object is obtained, it sets req.user to this user object. 
        // This makes the user object available in subsequent middleware functions or route handlers that 
        // are executed after this middleware in the request-response cycle.


        // So, there's no specific place where the req object is stored by default in your application code. 
        // Express.js creates and manages it internally, 
        // and it's passed from one middleware function to another until the response is sent back to the client.


        next();
    }

    catch (error) {
        console.log("error in protectRoute middleware", error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}

export default protectRoute