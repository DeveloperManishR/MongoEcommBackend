import express from "express"
import { createProduct, getAllProducts, updateProduct } from "../../controllers/Admin/product.controller.js"

const app=express()



app.get('/',getAllProducts)
app.put('/',updateProduct)
app.post('/',createProduct)



export default app