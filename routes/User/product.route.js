import express from "express"
import { getAllProducts } from "../../controllers/User/product.controller.js"


const app=express()

app.get('/',getAllProducts)
// app.use('/')


export default app