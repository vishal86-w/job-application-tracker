import Job from '../models/Job.js'

export const getJobs = async(req,res) =>{
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page-1)*limit
    const jobs = await Job.find({createdBy:req.userId}).skip(skip).limit(limit)

    const totalJob = await Job.countDocuments({createdBy:req.userId})
    const totalPages = Math.ceil(totalJob/limit)
    
    res.status(200).json({jobs,totalJob,totalPages})
}

export const postNewJob = async(req,res)=>{
    const jobData = {
        ...req.body,
        createdBy:req.userId
    }
    const newJob = await Job.create(jobData)    
    console.log(newJob);
    res.status(201).json(newJob)   
}

export const deleteJobById = async(req,res)=>{
    const deleteJob = await Job.findOneAndDelete({createdBy:req.userId,_id:req.params.id})
    if(deleteJob===null){
        res.status(404).json({message:'Job not found'})
    }
    else{
        res.status(200).json({message:'Job successfully deleted'})
    }
}

export const updateJobById = async(req,res) => {
    const updatedJob = await Job.findOneAndUpdate({createdBy:req.userId,_id:req.params.id},req.body,{returnDocument:'after'})
    if(updatedJob===null){
        res.status(404).json({message:'Job not found'})
    }
    else{
        res.status(200).json(updatedJob)
    }
}