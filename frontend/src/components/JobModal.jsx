const JobModal = ({handleSubmit,editingId,handleModalButton,closeButtonRef,inputref,company,setCompany,setFormErrors,formErrors,position,setPosition,setStatus,date,setErrorToast,handleDelete,jobToDelete,setDate}) => {
    return (
        <>
            <button type="button" className="btn btn-primary m-2" onClick={handleModalButton} data-bs-toggle="modal" data-bs-target="#formModal">
                Add new Job
            </button>


            <div className="modal fade" tabIndex="-1" id="formModal" aria-labelledby="formModalLabel" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">

                            {<h5 className="modal-title fs-5" id="formModalLabel">{editingId ? 'Edit Job Form' : 'New Job Form'}</h5>}

                            <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeButtonRef} aria-label="Close" onClick={(e) => e.target.blur()}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} >
                                <label htmlFor="companyInput" className="form-label">Company Name</label>
                                <input type="text" className="form-control " ref={inputref} id="companyInput" value={company} onChange={(e) => {
                                    setCompany(e.target.value)
                                    setFormErrors({ ...formErrors, company: '' })
                                }} />
                                {formErrors.company && <span className='text-danger'>{formErrors.company}<br /></span>}

                                <label htmlFor="positionInput" className="form-label">Position</label>
                                <input type="text" className="form-control" id="positionInput" value={position} onChange={(e) => {
                                    setPosition(e.target.value)
                                    setFormErrors({ ...formErrors, position: '' })
                                }} />
                                {formErrors.position && <span className='text-danger'>{formErrors.position}<br /></span>}

                                <label htmlFor="statusInput" className='form-label'>Status</label>
                                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Applied" >Applied</option>
                                    <option value="Interviewing">Interviewing</option>
                                    <option value="Rejected">Rejected</option>
                                </select>

                                <label htmlFor="DateInput" className="form-label">Date Applied</label>
                                <input type="date" className="form-control" id="DateInput" value={date} onChange={(e) => setDate(e.target.value)} />


                                <button type='submit' className="btn btn-primary my-3 " onClick={(e) => e.target.blur()}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >


            <div className="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">

                        <h1 className="modal-title text-center py-4 fs-5" id="staticBackdropLabel">Delete Job Application?</h1>
                        <div className="modal-body text-center">
                            <button type="button" className="btn btn-danger" onClick={(e) => {
                                setErrorToast('Job Deleted Successfully')
                                handleDelete(jobToDelete)
                                e.target.blur()
                                setTimeout(() => setErrorToast(''), 3000)
                            }} data-bs-dismiss="modal">Delete</button>
                            <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal" onClick={(e) => e.target.blur()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default JobModal