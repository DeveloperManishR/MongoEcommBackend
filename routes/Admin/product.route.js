import express from "express"
import { createProduct, getAllProducts, getProductDetail, updateProduct } from "../../controllers/Admin/product.controller.js"

const app=express()



app.get('/',getAllProducts)
app.get('/:id',getProductDetail)

app.put('/:id',updateProduct)
app.post('/',createProduct)



export default app