import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'

import jobRoutes from './routes/jobRoutes.js'

const app = express()

app.use(express.json())

app.use('/api/jobs',jobRoutes)

app.use('/api/users',userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to mongoDb"))
    .catch((err)=>console.log("failed to connect to mongoDb"+err))

app.listen(5000,()=>{
    console.log('Server is running on port 5000')
})

