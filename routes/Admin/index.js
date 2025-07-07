import express from "express"
import productRoutes from "./product.route.js"
import authRoutes from "./auth.route.js"
import orderRoutes from "./order.route.js"
const app=express()


app.use('/auth',authRoutes)
app.use('/product',productRoutes)
app.use('/order',orderRoutes)

export default app