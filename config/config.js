import mongoose from "mongoose"
import Redis from "ioredis";
// import dotenv from "dotenv";

// dotenv.config()
export const ConnectDB=async()=>{
   try{
   await mongoose.connect(process.env.MONGO_URI)
   }catch(error){
    console.log("Error connection...", error);
   }
}

export const redis = new Redis(process.env.REDIS_URI);
