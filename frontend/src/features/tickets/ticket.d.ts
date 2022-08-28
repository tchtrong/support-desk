import { AppThunkAPIState } from '../../app/store'

export interface Ticket {
  user: string
  description: string
  product: string
  status: string
}

export interface TicketResponse extends Ticket {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface TicketState {
  tickets: TicketResponse[]
  ticket: TicketResponse | null
  status: 'initial' | 'loading' | 'success' | 'error'
  message: string
}

export interface CreateTicketRequest {
  description: string
  product: string
}

export interface TicketsThunkAPI extends AppThunkAPIState {
  rejectValue: string
}

export interface CreateTicketThunkAPI extends TicketsThunkAPI {}

export interface GetAllTicketsThunkAPI extends TicketsThunkAPI {}
