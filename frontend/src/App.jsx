import { useState, useRef } from 'react'

import './App.css'
import useJobs from './hooks/useJobs'
import JobTable from './components/JobTable'
import JobModal from './components/JobModal'


function App() {

  const { jobs, isLoading, handleDelete, addJob, editJob } = useJobs()
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('Applied')
  const [date, setDate] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [jobToDelete, setJobToDelete] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')

  const [searchTerm, setSearchTerm] = useState('')
  const [errorToast, setErrorToast] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const [sortKey,setSortKey]=useState(null)
  const [sortDirection,setSortDirection] = useState('asc')

  const closeButtonRef = useRef(null)
  const inputref = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    let newErrors = {}
    //validation
    if (company === '') {
      newErrors.company = 'Please fill the company Name.'

    }
    if (position === '') {
      newErrors.position = 'Please fill the position.'
    }
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors)
      return
    } else {
      setFormErrors('')

    }

    if (editingId) {
      editJob({ company, position, status, dateApplied: date || new Date().toISOString() }, editingId)
        .then(() => {

          closeButtonRef.current.click()
          setCompany('')
          setPosition('')
          setEditingId(null)
          setSuccessMessage('Job successfully edited!')
          setTimeout(() => { setSuccessMessage('') }, 3000)
        })
        .catch(() => {
          setErrorToast('Failed to edit job.')
          setTimeout(() => { setErrorToast('') }, 5000)
        })

    }
    else {
      addJob({ company, position, status, dateApplied: date || new Date().toISOString() })
        .then(() => {

          closeButtonRef.current.click()
          setSuccessMessage('Job successfully added!')
          setCompany('')
          setPosition('')
          setTimeout(() => { setSuccessMessage('') }, 3000)
        }
        )
        .catch(() => {
          setErrorToast('Failed to add new job.')
          setTimeout(() => { setErrorToast('') }, 5000)
        })

    }

  }


  const handleEdit = (job) => {
    setTimeout(() => inputref.current.focus(), 500)
    setCompany(job.company)
    setPosition(job.position)
    setFormErrors({})
    setEditingId(job._id)
    setDate(job.dateApplied ? job.dateApplied.split('T')[0] : '')
    setStatus(job.status)
  }

  const handleModalButton = () => {
    setTimeout(() => inputref.current.focus(), 500)
    setEditingId(null)
    setCompany('')
    setPosition('')
    setFormErrors({})
    setStatus('Applied')
    setDate('')
  }

  const handleSort =(key)=>{
    if(key===sortKey){
      if(sortDirection==='asc'){
        setSortDirection('desc')
      }else{
        setSortDirection('asc')
      }
    }
    else{
      setSortDirection('asc')
      setSortKey(key)
    }
  }



  const filteredJobs = jobs.filter((job) => (job.company.toLowerCase().includes(searchTerm.toLowerCase()) || job.position.toLowerCase().includes(searchTerm.toLowerCase())) && (filterStatus === 'All' || job.status === filterStatus))

  const sortedJobs = [...filteredJobs].sort((a,b)=>{
    if(sortKey==='company'){
      if(sortDirection==='asc'){
        return a.company.localeCompare(b.company)
      }
      else{
       return b.company.localeCompare(a.company)
      }
    }
    if(sortKey ==='date'){
      if(sortDirection==='asc'){
       return a.dateApplied.localeCompare(b.dateApplied)
      }
      else{
        return b.dateApplied.localeCompare(a.dateApplied)
      }
    }
    return 0
  })

  const getBadgeColor = (status) => {
    if (status === 'Applied') {
      return 'text-bg-primary'
    }
    else if (status === 'Interviewing') {
      return 'text-bg-warning'
    }
    else if (status === 'Rejected') {
      return 'text-bg-danger'
    }
  }

  const getSortIcon = (columnName)=>{
    if(columnName === sortKey){
      if(sortDirection==='asc'){
        return <i className="bi bi-caret-up-fill"></i>
      }
      else{
        return <i className="bi bi-caret-down-fill"></i>
      }
    }
    else{
      return <i className="bi bi-arrow-down-up"></i>
    }
  }

  const interviewingCount = jobs.filter((job) => (job.status === 'Interviewing')).length
  const appliedCount = jobs.filter((job) => (job.status === 'Applied')).length
  const rejectedCount = jobs.filter((job) => (job.status === 'Rejected')).length




  return (
    <>
      <h1 className='text-danger'>Job Application Tracker</h1>
      <div className="d-flex justify-content-center">
        <input className="form-control w-50 " type="text" placeholder="Search here..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
        <select type="text" className='form-select w-25 mx-2' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {successMessage !== '' &&
        <div className="toast show  position-fixed text-bg-primary border-0 top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 1060 }} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              {successMessage}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      }
      {errorToast !== '' &&
        <div className="toast show  position-fixed text-bg-danger border-0 top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 1060 }} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              {errorToast}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      }

      <JobModal 
      handleSubmit={handleSubmit}
      editingId = {editingId}
      handleModalButton ={handleModalButton}
      closeButtonRef = {closeButtonRef}
      inputref = {inputref}
      company = {company}
      setCompany = {setCompany}
      setFormErrors = {setFormErrors}
      formErrors = {formErrors}
      position = {position}
      setPosition = {setPosition}
      setStatus = {setStatus}
      date = {date}
      setErrorToast ={setErrorToast}
      handleDelete = {handleDelete}
      jobToDelete = {jobToDelete}
      setDate = {setDate}
      />
   


      {isLoading && <p className='text-secondary mt-4'>Loading...</p>}

      <div className="d-flex justify-content-center">
    {appliedCount>0 &&
        <div className="card text-bg-primary mb-3 mx-2" style={{ maxWidth: '18rem' }}>

          <div className="card-body ">
            <h5 className="card-title h3">Applied : {appliedCount}</h5>
          </div>
        </div>
     }

     {interviewingCount>0 &&
        <div className="card text-bg-warning mb-3 me-2" style={{ maxWidth: '18rem' }}>
          <div className="card-body ">
            <h5 className="card-title h3">Interviewing : {interviewingCount}</h5>
          </div>
        </div>
     }
      {rejectedCount>0 && 
        <div className="card text-bg-danger mb-3" style={{ maxWidth: '18rem' }}>
          <div className="card-body ">
            <h5 className="card-title h3">Rejected : {rejectedCount}</h5>
          </div>
        </div>
      }  
        
      </div>
      {jobs.length === 0 && !isLoading && <p className='text-muted mt-4  text-center'>No jobs applied yet. Add your first one!</p>}

      {
        jobs.length > 0 && 
        <JobTable 
        sortedJobs={sortedJobs}
        handleEdit={handleEdit}
        handleSort={handleSort}
        setJobToDelete={setJobToDelete}
        getBadgeColor={getBadgeColor}
        getSortIcon={getSortIcon}
        />
      }
    </>
  )
}

export default App
