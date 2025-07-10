import express from "express"
import { getAllProducts } from "../../controllers/User/product.controller.js"


const app=express()

app.use('/',getAllProducts)
// app.use('/')


export default app