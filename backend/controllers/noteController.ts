import express, { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { HydratedDocument } from 'mongoose'
import { UserTypeResponse } from '../middleware/authMiddleware'
import noteModel, { NoteType } from '../models/noteModel'
import { ticketModel } from '../models/ticketModel'

type NoteRequest<T, P = ParamsDictionary> = express.Request<P, any, T> & {
  user?: HydratedDocument<UserTypeResponse>
}

type GetNotesRequest = NoteRequest<any, { ticketId?: string }>
type AddNoteRequest = NoteRequest<
Pick<NoteType, 'text'>,
{ ticketId?: string }
>

export const getNotes: RequestHandler = (req: GetNotesRequest, res, next) => {
  ticketModel
    .findById(req.params.ticketId)
    .then(async (ticket) => {
      if (ticket?.user.toString() !== req.user?.id) {
        res.status(401)
        throw new Error('User not authorized')
      }
      return await noteModel.find({ ticket: req.params.ticketId })
    })
    .then((foundNotes) => {
      res.status(200).json(foundNotes)
    })
    .catch(next)
}

export const addNote: RequestHandler = (req: AddNoteRequest, res, next) => {
  ticketModel
    .findById(req.params.ticketId)
    .then(async (ticket) => {
      if (ticket?.user.toString() !== req.user?.id) {
        res.status(401)
        throw new Error('User not authorized')
      }
      return await noteModel.create({
        user: req.user?.id,
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false
      })
    })
    .then((createdNote) => {
      res.status(200).json(createdNote)
    })
    .catch(next)
}
