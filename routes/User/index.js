import express from "express"
import authRoutes from "./auth.route.js"
import cartRoutes from "./cart.route.js"
import productRoutes from "./product.route.js"
import categoryRoutes from "./category.route.js"

const app=express()

app.use('/auth',authRoutes)
app.use('/cart',cartRoutes)
app.use('/product',productRoutes)
//app.use('/catgeory',categoryRoutes)
// app.use('/wishlist',wishlistRoutes)


export default app