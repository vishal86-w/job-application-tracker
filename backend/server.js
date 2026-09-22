import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

import jobRoutes from './routes/jobRoutes.js'

const app = express()

app.use(express.json())

app.use('/api/jobs',jobRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to mongoDb"))
    .catch((err)=>console.log("failed to connect to mongoDb"+err))

app.listen(5000,()=>{
    console.log('Server is running on port 5000')
})

