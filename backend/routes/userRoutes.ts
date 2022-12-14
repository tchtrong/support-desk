import express from 'express'
import { getMe, loginUser, registerUser } from '../controllers/userController'

const router = express.Router()

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me', getMe)

export default router
