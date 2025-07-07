import express from "express"
import { login, logout, register,refreshToken } from "../../controllers/Public/public.controller.js";
const app=express()

app.post('/login',login)
app.post('/register',register)
app.post('/logout',logout)
app.post('/refresh-token',refreshToken)

export default app;