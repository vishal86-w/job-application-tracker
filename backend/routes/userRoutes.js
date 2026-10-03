import express from 'express'
import {registerUser,loginUser, logoutUser} from '../controllers/userController.js'
import { getUserProfile } from '../controllers/userController.js'
import auth from '../middleware/authMiddleWare.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',auth,getUserProfile)
router.post('/logout',auth,logoutUser)

export default router