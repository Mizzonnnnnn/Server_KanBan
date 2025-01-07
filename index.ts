import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import userRouter from "./src/routers/user";
import moduleName from './src/models/UserModel';
dotenv.config();

const PORT = process.env.PORT || 3002;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.qi9m3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

app.use('/auth', userRouter)

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL).then(() => console.log("Connected to db successfully!!!!"));
    } catch (error) {
        console.log("Can't connect to db ", error);
    }

}
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is starting at http://localhost:${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
    });

