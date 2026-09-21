require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const Job = require('./models/job')

const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to mongoDb"))
    .catch((err)=>console.log("failed to connect to mongoDb"+err))

app.listen(5000,()=>{
    console.log('Server is running on port 5000')
})


//post new job
app.post('/api/jobs',async (req,res)=>{
    const newJob = await Job.create(req.body)    
    res.status(201).json(newJob)
})

//get all job
app.get('/api/jobs',async (req,res)=>{
    const jobs = await Job.find({})
    res.status(200).json(jobs)
})

//delete a job by id
app.delete('/api/jobs/:id',async(req,res)=>{
    const deleteJob = await Job.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'Job successfully deleted'})
})

//update job by id
app.put('/api/jobs/:id',async (req,res)=>{
    const updatedJob = await Job.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedJob)
})