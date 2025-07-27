import express from "express"
import { createCategory, getAllCategories } from "../../controllers/Admin/category.controller.js"


const app=express()

app.get('/',getAllCategories)

app.post('/',createCategory)
// app.use('/')


export default app