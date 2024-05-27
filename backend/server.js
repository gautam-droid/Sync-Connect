import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from './db/connectToMongoDb.js';

const app = express();
const PORT = process.env.PORT||3000;

config();

app.use(express.json())//parse json from req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`hey im listening on ${PORT}`)
})

//no problem