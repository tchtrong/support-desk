import express, { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { HydratedDocument, Types } from 'mongoose'
import { UserTypeResponse } from '../middleware/authMiddleware'
import { ticketModel, TicketType } from '../models/ticketModel'

type TicketRequest<T, P = ParamsDictionary> = express.Request<P, any, T> & {
  user?: HydratedDocument<UserTypeResponse>
}
type CreateTicketRequest = TicketRequest<
Pick<TicketType, 'description' | 'product'>
>
type GetAllTicketsRequest = TicketRequest<Pick<TicketType, 'user'>>
type GetTicketByIdRequest = TicketRequest<{}, { id?: Types.ObjectId }>
type DeleteTicketByIdRequest = TicketRequest<{}, { id?: Types.ObjectId }>
type UpdateTicketByIdRequest = TicketRequest<
Omit<TicketType, 'user'>,
{ id?: Types.ObjectId }
>

export const getAllTickets: RequestHandler = (
  req: GetAllTicketsRequest,
  res,
  next
) => {
  ticketModel
    .find({ user: req.user?._id })
    .then((foundTickets) => {
      res.status(200).json(foundTickets)
    })
    .catch(next)
}

export const getTicketById: RequestHandler = (
  req: GetTicketByIdRequest,
  res,
  next
) => {
  if (req.params.id == null) {
    res.status(400)
    throw new Error('Bad request')
  }
  ticketModel
    .findById(req.params.id)
    .then((foundTicket) => {
      if (foundTicket == null) {
        res.status(404)
        throw new Error('Ticket not found')
      }
      if (foundTicket.user._id.toString() !== req.user?._id.toString()) {
        res.status(401)
        throw new Error('Not Authorised')
      }
      res.status(200).json(foundTicket)
    })
    .catch(next)
}

export const deleteTicketById: RequestHandler = (
  req: DeleteTicketByIdRequest,
  res,
  next
) => {
  if (req.params.id == null) {
    res.status(400)
    throw new Error('Bad request')
  }
  ticketModel
    .findById(req.params.id)
    .then(async (foundTicket) => {
      if (foundTicket == null) {
        res.status(404)
        throw new Error('Ticket not found')
      }
      if (foundTicket.user._id.toString() !== req.user?._id.toString()) {
        res.status(401)
        throw new Error('Not Authorised')
      }
      return await foundTicket.remove()
    })
    .then((removedTicket) => {
      res.status(200).json({
        success: true
      })
    })
    .catch(next)
}

export const updateTicketById: RequestHandler = (
  req: UpdateTicketByIdRequest,
  res,
  next
) => {
  if (req.params.id == null) {
    res.status(400)
    throw new Error('Bad request')
  }
  ticketModel
    .findById(req.params.id)
    .then(async (foundTicket) => {
      if (foundTicket == null) {
        res.status(404)
        throw new Error('Ticket not found')
      }
      if (foundTicket.user._id.toString() !== req.user?._id.toString()) {
        res.status(401)
        throw new Error('Not Authorised')
      }
      return await ticketModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
    })
    .then((updatedTicket) => {
      res.status(200).json(updatedTicket)
    })
    .catch(next)
}

export const createTicket: RequestHandler = (
  req: CreateTicketRequest,
  res,
  next
) => {
  if (req.body.description == null || req.body.product == null) {
    res.status(400)
    throw new Error('Please add a product and description')
  }
  ticketModel
    .create({
      description: req.body.description,
      product: req.body.product,
      status: 'new',
      user: req.user?._id
    })
    .then((createdTicket) => {
      res.status(201).json(createdTicket)
    })
    .catch(next)
}
