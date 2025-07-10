import express from "express"
import { decreaseQuantity, deleteCartProduct, getCartProducts, increaseQuantity } from "../../controllers/User/cart.controller.js"


const app=express()

 app.get('/',getCartProducts)
 app.put('/increase/:id',increaseQuantity)
 app.put('/decrease/:id',decreaseQuantity)
 app.delete('/:id',deleteCartProduct)



export default app