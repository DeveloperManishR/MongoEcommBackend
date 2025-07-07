import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/config.js";
import apiRoutes from "./routes/index.js"
import cookieParser from "cookie-parser";
dotenv.config();
ConnectDB()


const app=express()
app.use(express.json()) //allows you to parse Body request
app.use(cookieParser());

app.use(express.urlencoded({ extended: false, limit: 1000 }));


const PORT=process.env.PORT||4000

app.use('/api',apiRoutes)

app.listen(PORT,()=>{
 console.log(`Server is running on ${PORT}`)   
 
})