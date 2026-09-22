import Job from '../models/Job.js'

export const getJobs = async(req,res) =>{
    const jobs = await Job.find({})
    res.status(200).json(jobs)
}

export const postNewJob = async(req,res)=>{
    const newJob = await Job.create(req.body)    
    res.status(201).json(newJob)
}

export const deleteJobById = async(req,res)=>{
    const deleteJob = await Job.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'Job successfully deleted'})
}

export const updateJobById = async(req,res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id,req.body,{returnDocument:after})
    res.status(200).json(updatedJob)
}