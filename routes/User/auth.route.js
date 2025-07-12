import express from "express"
import { profileDetails } from "../../controllers/User/auth.controller.js"


const app=express()

app.get('/profile',profileDetails)


export default app