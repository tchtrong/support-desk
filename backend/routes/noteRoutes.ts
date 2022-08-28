import express from 'express'
import { addNote, getNotes } from '../controllers/noteController'
import { userAuth } from '../middleware/authMiddleware'

const noteRouter = express.Router({
  mergeParams: true
})

noteRouter.route('/').get(userAuth, getNotes).post(userAuth, addNote)

export default noteRouter
