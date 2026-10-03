import { useEffect, useState } from "react"
import api from "../config/axiosConfig"


const useJobs = (currentPage,setCurrentPage,sortKey,sortDirection, debouncedSearchTerm, filterStatus) => {
     const [jobs, setJobs] = useState([])
     const [isLoading, setIsLoading] = useState(true)
     // eslint-disable-next-line no-unused-vars
     const [error, setError] = useState('')
     const [totalPages,setTotalPages] = useState(0)
     const [totalAppliedJob,setTotalAppliedJob] = useState(0)
     const [totalInterviewingJob,setTotalInterviewingJob] = useState(0)
     const [totalRejectedJob,setTotalRejectedJob] = useState(0)

const fetchJobs =(currentPage,sortKey,sortDirection, searchTerm, filterStatus)=>{
     api.get(`/api/jobs?page=${currentPage}&sortKey=${sortKey}&sortDirection=${sortDirection}&searchTerm=${searchTerm}&filterStatus=${filterStatus}`)
      .then((response) => {
        setJobs(response.data.jobs)
        setTotalPages(response.data.totalPages)
        setTotalAppliedJob(response.data.totalAppliedJob)
        setTotalInterviewingJob(response.data.totalInterviewingJob)
        setTotalRejectedJob(response.data.totalRejectedJob)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
}

useEffect(() => {
   fetchJobs(currentPage,sortKey,sortDirection, debouncedSearchTerm, filterStatus)
  }, [currentPage,sortKey,sortDirection, debouncedSearchTerm, filterStatus])

  const handleDelete = (id) => {
    return api.delete(`/api/jobs/${id}`)
      .then(() => {
        fetchJobs(currentPage, sortKey, sortDirection, debouncedSearchTerm, filterStatus)
        if(jobs.length===1 && currentPage>1){
          setCurrentPage(currentPage-1)
        }
      })
      .catch(() => setError('Failed to delete job. Please try again.'))
  }

  const addJob=(jobData)=>{
    return api.post('/api/jobs', jobData)
        .then(() => {
          fetchJobs(currentPage, sortKey, sortDirection, debouncedSearchTerm, filterStatus)   
        })
        .catch((err) => console.log("error posting job data" + err))
  }

  const editJob =(jobData,id)=>{
    return api.put(`/api/jobs/${id}`, jobData)
        .then(() => {
          fetchJobs(currentPage, sortKey, sortDirection, debouncedSearchTerm, filterStatus)
        })
  }
     
  return {jobs,isLoading,handleDelete,addJob,editJob,totalPages,totalAppliedJob,totalInterviewingJob,totalRejectedJob}
}

export default useJobs