import express from 'express'
import {
  createTicket,
  deleteTicketById,
  getAllTickets,
  getTicketById,
  updateTicketById
} from '../controllers/ticketController'
import { userAuth } from '../middleware/authMiddleware'
import noteRouter from './noteRoutes'

const ticketRouter = express.Router()

ticketRouter
  .route('/')
  .get(userAuth, getAllTickets)
  .post(userAuth, createTicket)
ticketRouter.route('/:id').get(userAuth, getTicketById)
ticketRouter.route('/:id').put(userAuth, updateTicketById)
ticketRouter.route('/:id').delete(userAuth, deleteTicketById)

ticketRouter.use('/:ticketId/notes', noteRouter)

export default ticketRouter
