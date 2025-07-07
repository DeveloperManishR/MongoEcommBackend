import expres from "express"
import publicRoutes from "./Public/index.js"
import adminRoutes from "./Admin/index.js"

const app=expres()

// app.use('/user',)
// app.use('/admin')
app.use('/admin',adminRoutes)
app.use('/public',publicRoutes)



export default app