    import { useState, useRef, useEffect } from 'react'
    import useJobs from '../hooks/useJobs.jsx'
    import JobTable from '../components/JobTable.jsx'
    import JobModal from '../components/JobModal.jsx'
    import Pagination from '../components/Pagination.jsx'
import useAuth from '../hooks/useAuth.jsx'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'


    const Dashboard = () => {

        const [currentPage,setCurrentPage] = useState(1)
        const [sortKey, setSortKey] = useState(null)
        const [sortDirection, setSortDirection] = useState('asc')
        const [filterStatus, setFilterStatus] = useState('All')
        const [searchTerm, setSearchTerm] = useState('')
        const [debouncedSearchTerm,setDebouncedSearchTerm] = useState('')
        
        const { jobs, isLoading , addJob, editJob,handleDelete,totalPages,totalAppliedJob,totalInterviewingJob,totalRejectedJob} = useJobs(currentPage,setCurrentPage,sortKey,sortDirection, debouncedSearchTerm, filterStatus)
        const{logoutUser}=useAuth()
        const [jobToDelete, setJobToDelete] = useState(null)
        const [jobToEdit, setJobToEdit] = useState(null)
        const navigate = useNavigate()
        const isFiltering = searchTerm!=='' || filterStatus!=='All'
        
        const inputref = useRef(null)

        useEffect(() => {
        const timerId = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm)
        }, 500)

        return () => clearTimeout(timerId)
        }, [searchTerm])

        const handleSort = (key) => {
            if (key === sortKey) {
                if (sortDirection === 'asc') {
                    setSortDirection('desc')
                } else {
                    setSortDirection('asc')
                }
            }
            else {
                setSortDirection('asc')
                setSortKey(key)
            }
        }




        

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

        const getSortIcon = (columnName) => {
            if (columnName === sortKey) {
                if (sortDirection === 'asc') {
                    return <i className="bi bi-caret-up-fill"></i>
                }
                else {
                    return <i className="bi bi-caret-down-fill"></i>
                }
            }
            else {
                return <i className="bi bi-arrow-down-up"></i>
            }
        }

        const handleLogout =async()=>{
           await logoutUser()
           navigate('/login')
        }
        const handleProfile =()=>{
            navigate('/profile')
        }

        return (
            <>
                <h1 className='text-danger'>Job Application Tracker</h1>
                <div className="d-flex justify-content-center">
                    <input className="form-control w-50 " type="text" placeholder="Search here..." onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                    }} value={searchTerm} />
                    <select type="text" className='form-select w-25 mx-2' value={filterStatus} onChange={(e) => {
                        setFilterStatus(e.target.value)
                        setCurrentPage(1)
                    }} >
                        <option value="All">All</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <button className='btn'onClick={()=>handleProfile()}>Profile</button>
                    <button className='btn' onClick={()=>handleLogout()}>Log out</button>
                </div>


                <JobModal               
                    inputref={inputref}
                    jobToEdit={jobToEdit}
                    setJobToEdit={setJobToEdit}
                    addJob = {addJob}
                    editJob={editJob}
                    jobToDelete={jobToDelete}
                    handleDelete={handleDelete}
                />

                {isLoading && <p className='text-secondary mt-4'><Spinner/> Loading...</p>}

                <div className="d-flex justify-content-center">
                    {totalAppliedJob > 0 &&
                        <div className="card text-bg-primary mb-3 mx-2" style={{ maxWidth: '18rem' }}>

                            <div className="card-body ">
                                <h5 className="card-title h3">Applied : {totalAppliedJob}</h5>
                            </div>
                        </div>
                    }

                    {totalInterviewingJob > 0 &&
                        <div className="card text-bg-warning mb-3 me-2" style={{ maxWidth: '18rem' }}>
                            <div className="card-body ">
                                <h5 className="card-title h3">Interviewing : {totalInterviewingJob}</h5>
                            </div>
                        </div>
                    }
                    {totalRejectedJob > 0 &&
                        <div className="card text-bg-danger mb-3" style={{ maxWidth: '18rem' }}>
                            <div className="card-body ">
                                <h5 className="card-title h3">Rejected : {totalRejectedJob}</h5>
                            </div>
                        </div>
                    }

                </div>
                {!isFiltering  && jobs.length === 0 && !isLoading && <p className='text-muted mt-4  text-center'>No jobs applied yet. Add your first one!</p>}
                {isFiltering && jobs.length === 0 && !isLoading && <p className='text-muted mt-4  text-center'>this status is empty</p>}

                {
                    jobs.length > 0 &&
                    <JobTable
                        jobs={jobs}
                        inputref={inputref}
                        setJobToEdit={setJobToEdit}
                        handleSort={handleSort}
                        setJobToDelete={setJobToDelete}
                        getBadgeColor={getBadgeColor}
                        getSortIcon={getSortIcon}
                    />
                }
                {
                    jobs.length>0 &&
                    <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    totalAppliedJob={totalAppliedJob}
                    totalRejectedJob={totalRejectedJob}
                />
                }
                
            </>
        )
    }



    export default Dashboard