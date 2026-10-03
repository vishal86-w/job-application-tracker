import Job from '../models/Job.js'

export const getJobs = async(req,res) =>{
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const sortKey = req.query.sortKey || 'company'
    const sortDirection = req.query.sortDirection || 'asc'
    let sortValue = 1

    const searchTerm = req.query.searchTerm || ''
    const filterStatus = req.query.filterStatus || 'All'

    const queryObj = {
        createdBy:req.userId
    }

    if(filterStatus!== 'All'){
        queryObj.status = filterStatus
    }

    if(searchTerm!==''){
        queryObj.$or = [
            {company:{$regex:searchTerm,$options:'i'}},
            {position:{$regex:searchTerm,$options:'i'}}
        ]
    }
    const skip = (page-1)*limit
    if(sortDirection==='asc'){
       sortValue = 1
    }else{
        sortValue = -1
    }
    const jobs = await Job.find(queryObj).sort({[sortKey]:sortValue}).skip(skip).limit(limit)


    const totalJob = await Job.countDocuments(queryObj)
    const totalAppliedJob = await Job.countDocuments({status:'Applied',createdBy:req.userId})
    const totalInterviewingJob = await Job.countDocuments({status:'Interviewing',createdBy:req.userId})
    const totalRejectedJob = await Job.countDocuments({status:'Rejected',createdBy:req.userId})

    const totalPages = Math.ceil(totalJob/limit)
    
    res.status(200).json({jobs,totalJob,totalPages,totalAppliedJob,totalInterviewingJob,totalRejectedJob})
}

export const postNewJob = async(req,res)=>{
    const jobData = {
        ...req.body,
        createdBy:req.userId
    }
    const newJob = await Job.create(jobData)    
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