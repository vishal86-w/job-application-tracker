import express from 'express'
import {getJobs, postNewJob, deleteJobById, updateJobById} from '../controllers/jobController.js'
import auth from '../middleware/authMiddleWare.js'

const router = express.Router()

//get all jobs
router.get('/',getJobs)

//add new job
router.post('/',auth,postNewJob)

//update job by id
router.put('/:id',updateJobById)

//delete job by id
router.delete('/:id',deleteJobById)

export default router
