
const Pagination = ({ currentPage, totalPages, setCurrentPage,totalAppliedJob ,totalRejectedJob}) => {

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item ">
                        <a className={`page-link ${currentPage === 1 ? 'disabled' : ''}`} href="#" onClick={(e) => {
                            e.preventDefault()
                            if (currentPage > 1 || totalAppliedJob!==0 || totalRejectedJob!==0) {
                                setCurrentPage(currentPage - 1)
                            }
                        }}>Previous</a>
                    </li>
                    <li className="page-item disabled">
                        <span className="page-link text-dark">Page {currentPage} of {totalPages}</span>
                    </li>
                    <li className="page-item">
                        <a className={`page-link ${currentPage >= totalPages ? 'disabled' : ''}`} href="#" onClick={(e) => {
                            e.preventDefault()
                            if (currentPage < totalPages ) {
                                setCurrentPage(currentPage + 1)
                            }
                        }}>Next</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination