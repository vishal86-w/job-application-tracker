import { useState, useRef } from 'react'
import useJobs from '../hooks/useJobs.jsx'
import JobTable from '../components/JobTable.jsx'
import JobModal from '../components/JobModal.jsx'


const Dashboard = () => {


    const { jobs, isLoading , addJob, editJob,handleDelete} = useJobs()
    const [jobToDelete, setJobToDelete] = useState(null)
    const [filterStatus, setFilterStatus] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')

    const [jobToEdit, setJobToEdit] = useState(null)


    

    const [sortKey, setSortKey] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')

    const inputref = useRef(null)


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



    const filteredJobs = jobs.filter((job) => (job.company.toLowerCase().includes(searchTerm.toLowerCase()) || job.position.toLowerCase().includes(searchTerm.toLowerCase())) && (filterStatus === 'All' || job.status === filterStatus))

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortKey === 'company') {
            if (sortDirection === 'asc') {
                return a.company.localeCompare(b.company)
            }
            else {
                return b.company.localeCompare(a.company)
            }
        }
        if (sortKey === 'date') {
            if (sortDirection === 'asc') {
                return a.dateApplied.localeCompare(b.dateApplied)
            }
            else {
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


            <JobModal               
                inputref={inputref}
                jobToEdit={jobToEdit}
                setJobToEdit={setJobToEdit}
                addJob = {addJob}
                editJob={editJob}
                jobToDelete={jobToDelete}
                handleDelete={handleDelete}
            />



            {isLoading && <p className='text-secondary mt-4'>Loading...</p>}

            <div className="d-flex justify-content-center">
                {appliedCount > 0 &&
                    <div className="card text-bg-primary mb-3 mx-2" style={{ maxWidth: '18rem' }}>

                        <div className="card-body ">
                            <h5 className="card-title h3">Applied : {appliedCount}</h5>
                        </div>
                    </div>
                }

                {interviewingCount > 0 &&
                    <div className="card text-bg-warning mb-3 me-2" style={{ maxWidth: '18rem' }}>
                        <div className="card-body ">
                            <h5 className="card-title h3">Interviewing : {interviewingCount}</h5>
                        </div>
                    </div>
                }
                {rejectedCount > 0 &&
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
                    inputref={inputref}
                    setJobToEdit={setJobToEdit}
                    handleSort={handleSort}
                    setJobToDelete={setJobToDelete}
                    getBadgeColor={getBadgeColor}
                    getSortIcon={getSortIcon}
                />
            }
        </>
    )
}



export default Dashboard