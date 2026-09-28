import { useEffect, useState } from "react"
import api from "../config/axiosConfig"


const useJobs = () => {
     const [jobs, setJobs] = useState([])
     const [isLoading, setIsLoading] = useState(true)
     // eslint-disable-next-line no-unused-vars
     const [error, setError] = useState('')

useEffect(() => {
    api.get('/api/jobs')
      .then((response) => {
        setJobs(response.data.jobs)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const handleDelete = (id) => {
    return api.delete(`/api/jobs/${id}`)
      .then(() => {
        setJobs(jobs.filter((job) => job._id !== id))
      })
      .catch(() => setError('Failed to delete job. Please try again.'))
  }

  const addJob=(jobData)=>{
    return api.post('/api/jobs', jobData)
        .then((response) => {
          setJobs([...jobs, response.data])    
        })
        .catch((err) => console.log("error posting job data" + err))
  }

  const editJob =(jobData,id)=>{
    return api.put(`/api/jobs/${id}`, jobData)
        .then((response) => {
          setJobs(jobs.map((job) => job._id === id ? response.data : job))
         
        })
  }
     
  return {jobs,isLoading,handleDelete,addJob,editJob}
}

export default useJobs