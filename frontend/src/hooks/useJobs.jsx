import axios from "axios"
import { useEffect, useState } from "react"


const useJobs = () => {
     const [jobs, setJobs] = useState([])
     const [isLoading, setIsLoading] = useState(true)
     const [error, setError] = useState('')

useEffect(() => {
    axios.get('/api/jobs')
      .then((response) => {
        setJobs(response.data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const handleDelete = (id) => {
    return axios.delete(`/api/jobs/${id}`)
      .then(() => {
        setJobs(jobs.filter((job) => job._id !== id))
      })
      .catch(() => setError('Failed to delete job. Please try again.'))
  }

  const addJob=(jobData)=>{
    return axios.post('/api/jobs', jobData)
        .then((response) => {
          setJobs([...jobs, response.data])    
        })
        .catch((err) => console.log("error posting job data" + err))
  }

  const editJob =(jobData,id)=>{
    return axios.put(`/api/jobs/${id}`, jobData)
        .then((response) => {
          setJobs(jobs.map((job) => job._id === id ? response.data : job))
         
        })
  }
     
  return {jobs,isLoading,handleDelete,addJob,editJob}
}

export default useJobs