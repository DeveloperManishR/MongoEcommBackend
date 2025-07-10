import expres from "express"
import publicRoutes from "./Public/index.js"
import adminRoutes from "./Admin/index.js"
import userRoutes from "./User/index.js"
import { authenticateAdmin, authenticateUser } from "../middlewares/auth.middleware.js"

const app=expres()

// app.use('/user',)
// app.use('/admin')
app.use('/admin',authenticateAdmin,adminRoutes)
app.use('/user',authenticateUser,userRoutes)
app.use('/public',publicRoutes)



export default app