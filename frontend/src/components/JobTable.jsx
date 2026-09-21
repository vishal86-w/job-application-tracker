
const JobTable = ({handleEdit,handleSort,getSortIcon,getBadgeColor,sortedJobs,setJobToDelete}) => {
  return (
    <>
    <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col"  onClick={()=>handleSort('company')}>Company Name {getSortIcon('company')}</th>
              <th scope="col">Position</th>
              <th scope="col">Status</th>
              <th scope="col" onClick={()=>handleSort('date')}>Date {getSortIcon('date')}</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedJobs.map((job) => (

              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.position}</td>
                <td><span className={`badge ${getBadgeColor(job.status)}`}>{job.status}</span></td>
                <td>{new Date(job.dateApplied).toLocaleDateString('en-GB')}</td>
                <td>
                  <button type='button' className="btn btn-danger me-2" data-bs-target="#deleteModal" data-bs-toggle="modal" onClick={() => setJobToDelete(job._id)}>delete</button>
                  <button type='button' className="btn btn-success" data-bs-toggle="modal" data-bs-target="#formModal" onClick={() => handleEdit(job)}>Edit</button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
    </>
  )
}

export default JobTable